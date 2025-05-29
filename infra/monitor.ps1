# LEGO Learning Platform - Infrastructure Monitoring Script

param(
    [Parameter(HelpMessage="Show detailed resource information")]
    [switch]$Detailed,
    
    [Parameter(HelpMessage="Check WAF logs for the last N hours")]
    [int]$WafLogsHours = 1,
    
    [Parameter(HelpMessage="Show health status of all components")]
    [switch]$Health,
    
    [Parameter(HelpMessage="Resource group name")]
    [string]$ResourceGroup = ""
)

Write-Host "🔍 LEGO Learning Platform - Infrastructure Monitor" -ForegroundColor Green

# Get Azure Developer CLI environment values
try {
    $envValues = azd env get-values | ConvertFrom-StringData
    if (-not $ResourceGroup) {
        $ResourceGroup = $envValues.AZURE_RESOURCE_GROUP
    }
} catch {
    Write-Host "❌ Could not get environment values. Make sure azd is initialized." -ForegroundColor Red
    exit 1
}

if (-not $ResourceGroup) {
    Write-Host "❌ Resource group not found. Please specify with -ResourceGroup parameter." -ForegroundColor Red
    exit 1
}

Write-Host "📍 Resource Group: $ResourceGroup" -ForegroundColor Cyan

# Function to check resource status
function Get-ResourceStatus {
    param($ResourceType, $ResourceName)
    
    try {
        $resource = az resource show --resource-group $ResourceGroup --resource-type $ResourceType --name $ResourceName 2>$null | ConvertFrom-Json
        if ($resource) {
            return @{
                Status = "✅ Running"
                Location = $resource.location
                Id = $resource.id
            }
        } else {
            return @{
                Status = "❌ Not Found"
                Location = "N/A"
                Id = "N/A"
            }
        }
    } catch {
        return @{
            Status = "⚠️ Error"
            Location = "N/A"
            Id = "N/A"
        }
    }
}

# Get all resources in the resource group
Write-Host "`n📋 Resource Overview:" -ForegroundColor Yellow
$resources = az resource list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json

if ($resources) {
    $resources | ForEach-Object {
        Write-Host "  $($_.type.Split('/')[-1]): $($_.name)" -ForegroundColor White
    }
} else {
    Write-Host "  No resources found or access denied" -ForegroundColor Red
}

# Application Gateway Status
if ($Health -or $Detailed) {
    Write-Host "`n🛡️ Application Gateway Status:" -ForegroundColor Yellow
    
    $appGateways = az network application-gateway list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($appGateways) {
        foreach ($gw in $appGateways) {
            Write-Host "  Name: $($gw.name)" -ForegroundColor White
            Write-Host "  Status: $($gw.provisioningState)" -ForegroundColor $(if ($gw.provisioningState -eq "Succeeded") { "Green" } else { "Red" })
            Write-Host "  SKU: $($gw.sku.name) (Tier: $($gw.sku.tier))" -ForegroundColor Cyan
            Write-Host "  Frontend IP: $($gw.frontendIPConfigurations[0].properties.publicIPAddress.id.Split('/')[-1])" -ForegroundColor Cyan
            
            if ($Detailed) {
                Write-Host "  Backend Pools: $($gw.backendAddressPools.Count)" -ForegroundColor White
                Write-Host "  WAF Enabled: $($gw.webApplicationFirewallConfiguration.enabled)" -ForegroundColor White
                Write-Host "  WAF Mode: $($gw.webApplicationFirewallConfiguration.firewallMode)" -ForegroundColor White
            }
        }
    } else {
        Write-Host "  No Application Gateways found" -ForegroundColor Red
    }
}

# Container Apps Status
if ($Health -or $Detailed) {
    Write-Host "`n🐳 Container Apps Status:" -ForegroundColor Yellow
    
    $containerApps = az containerapp list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($containerApps) {
        foreach ($app in $containerApps) {
            Write-Host "  Name: $($app.name)" -ForegroundColor White
            Write-Host "  Status: $($app.properties.provisioningState)" -ForegroundColor $(if ($app.properties.provisioningState -eq "Succeeded") { "Green" } else { "Red" })
            Write-Host "  Replicas: $($app.properties.template.scale.minReplicas)-$($app.properties.template.scale.maxReplicas)" -ForegroundColor Cyan
            Write-Host "  Internal URL: https://$($app.properties.configuration.ingress.fqdn)" -ForegroundColor Cyan
            
            if ($Detailed) {
                Write-Host "  CPU: $($app.properties.template.containers[0].resources.cpu)" -ForegroundColor White
                Write-Host "  Memory: $($app.properties.template.containers[0].resources.memory)" -ForegroundColor White
                Write-Host "  Image: $($app.properties.template.containers[0].image)" -ForegroundColor White
            }
        }
    } else {
        Write-Host "  No Container Apps found" -ForegroundColor Red
    }
}

# Public IP and DNS
if ($Health -or $Detailed) {
    Write-Host "`n🌐 Public Access:" -ForegroundColor Yellow
    
    $publicIPs = az network public-ip list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($publicIPs) {
        foreach ($ip in $publicIPs) {
            Write-Host "  Public IP: $($ip.ipAddress)" -ForegroundColor Green
            Write-Host "  FQDN: $($ip.dnsSettings.fqdn)" -ForegroundColor Green
            Write-Host "  Allocation: $($ip.publicIPAllocationMethod)" -ForegroundColor Cyan
        }
    }
}

# WAF Logs Analysis
if ($WafLogsHours -gt 0) {
    Write-Host "`n🔒 WAF Activity (Last $WafLogsHours hours):" -ForegroundColor Yellow
    
    $workspaces = az monitor log-analytics workspace list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($workspaces) {
        $workspace = $workspaces[0]
        $query = @"
AzureDiagnostics
| where TimeGenerated >= ago($($WafLogsHours)h)
| where Category == "ApplicationGatewayFirewallLog"
| summarize RequestCount = count() by action_s, ruleSetType_s, bin(TimeGenerated, 1h)
| order by TimeGenerated desc
"@
        
        try {
            $logs = az monitor log-analytics query --workspace $workspace.customerId --analytics-query $query 2>$null | ConvertFrom-Json
            if ($logs.tables -and $logs.tables[0].rows) {
                $logs.tables[0].rows | ForEach-Object {
                    Write-Host "  $($_[2]): $($_[1]) requests ($($_[0]))" -ForegroundColor $(if ($_[0] -eq "Blocked") { "Red" } else { "White" })
                }
            } else {
                Write-Host "  No WAF activity in the last $WafLogsHours hours" -ForegroundColor Green
            }
        } catch {
            Write-Host "  Could not query WAF logs (may need Log Analytics Reader permission)" -ForegroundColor Yellow
        }
    }
}

# Application Insights Status
if ($Health -or $Detailed) {
    Write-Host "`n📊 Application Insights:" -ForegroundColor Yellow
    
    $appInsights = az monitor app-insights component show --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($appInsights) {
        foreach ($ai in $appInsights) {
            Write-Host "  Name: $($ai.name)" -ForegroundColor White
            Write-Host "  Status: $($ai.provisioningState)" -ForegroundColor $(if ($ai.provisioningState -eq "Succeeded") { "Green" } else { "Red" })
            Write-Host "  Instrumentation Key: $($ai.instrumentationKey.Substring(0,8))..." -ForegroundColor Cyan
        }
    }
}

# Health Check
if ($Health) {
    Write-Host "`n🏥 Health Check:" -ForegroundColor Yellow
    
    # Test public endpoint
    if ($envValues.APPLICATION_GATEWAY_FQDN) {
        $url = "http://$($envValues.APPLICATION_GATEWAY_FQDN)"
        Write-Host "  Testing public endpoint: $url" -ForegroundColor White
        
        try {
            $response = Invoke-WebRequest -Uri $url -TimeoutSec 10 -UseBasicParsing
            Write-Host "  ✅ Public endpoint responding (Status: $($response.StatusCode))" -ForegroundColor Green
        } catch {
            Write-Host "  ❌ Public endpoint not responding: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Cost Information
if ($Detailed) {
    Write-Host "`n💰 Estimated Monthly Costs:" -ForegroundColor Yellow
    Write-Host "  Application Gateway WAF_v2: ~$250-400 USD" -ForegroundColor Cyan
    Write-Host "  Container Apps (Consumption): ~$10-50 USD" -ForegroundColor Cyan
    Write-Host "  Log Analytics: ~$5-20 USD" -ForegroundColor Cyan
    Write-Host "  Other services: ~$10-30 USD" -ForegroundColor Cyan
    Write-Host "  Total estimated: ~$275-500 USD/month" -ForegroundColor Yellow
}

Write-Host "`n✅ Monitoring complete!" -ForegroundColor Green
Write-Host "💡 Run with -Health for health checks, -Detailed for more info, -WafLogsHours X for WAF analysis" -ForegroundColor Cyan
