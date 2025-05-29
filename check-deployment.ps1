# Check deployment status
Write-Host "Checking LEGO Learning Platform Deployment Status" -ForegroundColor Cyan

try {
    # Get environment values
    $envOutput = azd env get-values
    Write-Host "`nEnvironment Variables:" -ForegroundColor Yellow
    $envOutput | Select-String "WEB_URI|APPLICATION_GATEWAY|AZURE_CONTAINER_APP"
    
    # Get resource group
    $resourceGroup = ($envOutput | Select-String "AZURE_RESOURCE_GROUP").ToString().Split('"')[1]
    Write-Host "`nResource Group: $resourceGroup" -ForegroundColor Yellow
    
    # List all resources
    Write-Host "`nDeployed Resources:" -ForegroundColor Yellow
    $resources = az resource list --resource-group $resourceGroup | ConvertFrom-Json
    $resources | ForEach-Object { 
        Write-Host "  - $($_.name) ($($_.type))" -ForegroundColor White
    }
    
    # Check specifically for Application Gateway
    Write-Host "`nApplication Gateway Check:" -ForegroundColor Yellow
    $appGateways = az network application-gateway list --resource-group $resourceGroup | ConvertFrom-Json
    if ($appGateways.Count -gt 0) {
        Write-Host "  ✅ Application Gateway found: $($appGateways[0].name)" -ForegroundColor Green
        
        # Get public IP
        $publicIpId = $appGateways[0].frontendIPConfigurations[0].publicIPAddress.id
        $publicIpName = $publicIpId.Split('/')[-1]
        $publicIp = az network public-ip show --resource-group $resourceGroup --name $publicIpName | ConvertFrom-Json
        
        Write-Host "  📍 Public IP: $($publicIp.ipAddress)" -ForegroundColor Green
        Write-Host "  🌐 FQDN: $($publicIp.dnsSettings.fqdn)" -ForegroundColor Green
        Write-Host "  🔗 URL: http://$($publicIp.dnsSettings.fqdn)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ No Application Gateway found" -ForegroundColor Red
    }
    
} catch {
    Write-Host "Error checking deployment: $($_.Exception.Message)" -ForegroundColor Red
}
