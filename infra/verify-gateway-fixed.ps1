# LEGO Learning Platform - Application Gateway Verification
Write-Host "🔍 Application Gateway Verification" -ForegroundColor Cyan

try {
    # Check current working environment
    $envValues = azd env get-values | Out-String
    if (-not $envValues) {
        Write-Host "❌ Could not get environment values. Is azd initialized?" -ForegroundColor Red
        exit 1
    }

    # Parse resource group
    $resourceGroupLine = $envValues -split "`n" | Where-Object { $_ -match "AZURE_RESOURCE_GROUP" }
    $resourceGroup = ($resourceGroupLine -split '=')[1].Trim('"')
    
    Write-Host "📍 Resource Group: $resourceGroup" -ForegroundColor Cyan

    # Check for Application Gateway using simple command
    Write-Host "`n🌐 Checking Application Gateway..." -ForegroundColor Yellow
    
    $gateways = & az network application-gateway list -g $resourceGroup 2>$null
    if ($LASTEXITCODE -eq 0 -and $gateways) {
        $gatewayData = $gateways | ConvertFrom-Json
        if ($gatewayData.Count -gt 0) {
            Write-Host "✅ Application Gateway found: $($gatewayData[0].name)" -ForegroundColor Green
            
            # Try to get public IP info
            try {
                $publicIps = & az network public-ip list -g $resourceGroup 2>$null | ConvertFrom-Json
                $appGwPublicIp = $publicIps | Where-Object { $_.name -like "*$resourceToken" }
                
                if ($appGwPublicIp) {
                    Write-Host "  📍 Public IP: $($appGwPublicIp.ipAddress)" -ForegroundColor Green
                    if ($appGwPublicIp.dnsSettings.fqdn) {
                        Write-Host "  🌐 FQDN: $($appGwPublicIp.dnsSettings.fqdn)" -ForegroundColor Green
                        Write-Host "  🔗 Application Gateway URL: http://$($appGwPublicIp.dnsSettings.fqdn)" -ForegroundColor Green
                        
                        # Test connectivity
                        Write-Host "`n🧪 Testing Application Gateway connectivity..." -ForegroundColor Yellow
                        try {
                            $response = Invoke-WebRequest -Uri "http://$($appGwPublicIp.dnsSettings.fqdn)" -Method Head -TimeoutSec 30
                            Write-Host "✅ Application Gateway is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
                        }
                        catch {
                            Write-Host "❌ Application Gateway not accessible: $($_.Exception.Message)" -ForegroundColor Red
                        }
                    }
                }
            }
            catch {
                Write-Host "⚠️  Could not get public IP details: $($_.Exception.Message)" -ForegroundColor Yellow
            }
        }
        else {
            Write-Host "❌ No Application Gateway found in resource group" -ForegroundColor Red
        }
    }
    else {
        Write-Host "❌ No Application Gateway found or command failed" -ForegroundColor Red
    }

    # Check Container App status
    Write-Host "`n📱 Container App Status:" -ForegroundColor Yellow
    $containerAppLine = $envValues -split "`n" | Where-Object { $_ -match "WEB_URI" }
    if ($containerAppLine) {
        $containerAppUrl = ($containerAppLine -split '=')[1].Trim('"')
        Write-Host "  📍 Container App URL: $containerAppUrl" -ForegroundColor White
        
        # Test container app accessibility
        try {
            $response = Invoke-WebRequest -Uri $containerAppUrl -Method Head -TimeoutSec 30
            Write-Host "  ✅ Container App is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
            Write-Host "  ⚠️  Note: Container App should be internal-only but is publicly accessible" -ForegroundColor Yellow
        }
        catch {
            Write-Host "  ❌ Container App not accessible: $($_.Exception.Message)" -ForegroundColor Red
        }
    }

    Write-Host "`n📋 Summary:" -ForegroundColor Cyan
    Write-Host "1. Application Gateway should be accessible via its public FQDN" -ForegroundColor White
    Write-Host "2. Container App should only be accessible through Application Gateway" -ForegroundColor White
    Write-Host "3. WAF should be protecting all incoming traffic" -ForegroundColor White
    Write-Host "4. Traffic flow: Internet → Application Gateway → WAF → Container App" -ForegroundColor White

}
catch {
    Write-Host "❌ Error during verification: $($_.Exception.Message)" -ForegroundColor Red
}
