# LEGO Learning Platform - Application Gateway Verification Script

param(
    [Parameter(HelpMessage="Resource group name")]
    [string]$ResourceGroup = ""
)

Write-Host "🔍 Application Gateway Verification" -ForegroundColor Green

# Get environment values
try {
    $envValues = azd env get-values | ConvertFrom-StringData
    if (-not $ResourceGroup) {
        $ResourceGroup = $envValues.AZURE_RESOURCE_GROUP
    }
} catch {
    Write-Host "❌ Could not get environment values. Make sure azd is initialized." -ForegroundColor Red
    exit 1
}

Write-Host "📍 Resource Group: $ResourceGroup" -ForegroundColor Cyan

# Check if Application Gateway exists
Write-Host "`n🌐 Checking Application Gateway..." -ForegroundColor Yellow
$appGateways = az network application-gateway list -g $ResourceGroup | ConvertFrom-Json

if ($appGateways.Count -gt 0) {
    $gateway = $appGateways[0]
    Write-Host "✅ Application Gateway found: $($gateway.name)" -ForegroundColor Green
    
    # Get public IP and FQDN
    $publicIpId = $gateway.frontendIPConfigurations[0].publicIPAddress.id
    $publicIpName = $publicIpId.Split('/')[-1]
    $publicIp = az network public-ip show -g $ResourceGroup -n $publicIpName | ConvertFrom-Json
    
    $fqdn = $publicIp.dnsSettings.fqdn
    $ipAddress = $publicIp.ipAddress
    
    Write-Host "📍 Public IP: $ipAddress" -ForegroundColor White
    Write-Host "🌍 FQDN: $fqdn" -ForegroundColor White
    Write-Host "🔗 URL: http://$fqdn" -ForegroundColor Cyan
    
    # Test connectivity
    Write-Host "`n🔍 Testing Application Gateway connectivity..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "http://$fqdn" -Method GET -TimeoutSec 30
        Write-Host "✅ Application Gateway is accessible!" -ForegroundColor Green
        Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor White
        Write-Host "   Content Length: $($response.Content.Length) bytes" -ForegroundColor White
        
        # Check if it's the LEGO learning platform
        if ($response.Content -like "*LEGO*" -or $response.Content -like "*learn*") {
            Write-Host "✅ LEGO Learning Platform detected!" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Response doesn't appear to be from LEGO Learning Platform" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "❌ Failed to connect to Application Gateway" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Check WAF status
    Write-Host "`n🛡️ WAF Configuration:" -ForegroundColor Yellow
    Write-Host "   Enabled: $($gateway.webApplicationFirewallConfiguration.enabled)" -ForegroundColor White
    Write-Host "   Mode: $($gateway.webApplicationFirewallConfiguration.firewallMode)" -ForegroundColor White
    Write-Host "   Rule Set: $($gateway.webApplicationFirewallConfiguration.ruleSetType) $($gateway.webApplicationFirewallConfiguration.ruleSetVersion)" -ForegroundColor White
    
} else {
    Write-Host "❌ No Application Gateway found in resource group" -ForegroundColor Red
}

# Check Container App (should be internal only)
Write-Host "`n📦 Checking Container App accessibility..." -ForegroundColor Yellow
$containerApps = az containerapp list -g $ResourceGroup | ConvertFrom-Json

if ($containerApps.Count -gt 0) {
    $containerApp = $containerApps[0]
    $internalFqdn = $containerApp.properties.configuration.ingress.fqdn
    
    Write-Host "📍 Container App Internal FQDN: $internalFqdn" -ForegroundColor White
    
    # Try to access Container App directly (should fail from external)
    try {
        $response = Invoke-WebRequest -Uri "https://$internalFqdn" -Method GET -TimeoutSec 10
        Write-Host "⚠️  Container App is externally accessible (unexpected)" -ForegroundColor Yellow
    } catch {
        Write-Host "✅ Container App is properly internal-only" -ForegroundColor Green
        Write-Host "   (Cannot access directly from external network)" -ForegroundColor White
    }
}

Write-Host "`n🎯 Verification Summary:" -ForegroundColor Cyan
Write-Host "1. Application Gateway should be accessible via public IP/FQDN" -ForegroundColor White
Write-Host "2. Container App should be internal-only (not directly accessible)" -ForegroundColor White
Write-Host "3. WAF should be enabled in Detection mode" -ForegroundColor White
Write-Host "4. Traffic flow: Internet → Application Gateway (WAF) → VNet → Container App" -ForegroundColor White
