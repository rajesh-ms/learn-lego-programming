# LEGO Learning Platform - Secure Infrastructure Deployment

Write-Host "🚀 Deploying LEGO Learning Platform with Secure Architecture" -ForegroundColor Green
Write-Host "This will deploy Application Gateway with WAF, VNet, and Container Apps" -ForegroundColor Yellow

# Check if Azure CLI is logged in
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "❌ Not logged in to Azure CLI. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Logged in as: $($account.user.name)" -ForegroundColor Green
Write-Host "📍 Subscription: $($account.name) ($($account.id))" -ForegroundColor Cyan

# Check if azd is initialized
if (-not (Test-Path "azure.yaml")) {
    Write-Host "❌ Azure Developer CLI not initialized. Please run 'azd init' first." -ForegroundColor Red
    exit 1
}

# Validate Bicep template
Write-Host "🔍 Validating Bicep template..." -ForegroundColor Yellow
$validation = az deployment group validate --resource-group "rg-learn-lego-dev" --template-file "infra/main.bicep" --parameters "infra/main.parameters.json" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Bicep template validation failed:" -ForegroundColor Red
    Write-Host $validation -ForegroundColor Red
    Write-Host "Please fix the template issues before proceeding." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Bicep template validation passed" -ForegroundColor Green

# Show what will be deployed
Write-Host "`n📋 This deployment will create:" -ForegroundColor Cyan
Write-Host "  • Virtual Network with 3 subnets" -ForegroundColor White
Write-Host "  • Application Gateway with WAF (OWASP 3.2)" -ForegroundColor White
Write-Host "  • Container Apps Environment (private)" -ForegroundColor White
Write-Host "  • Container App (internal only)" -ForegroundColor White
Write-Host "  • Container Registry" -ForegroundColor White
Write-Host "  • Key Vault for secrets" -ForegroundColor White
Write-Host "  • Application Insights monitoring" -ForegroundColor White
Write-Host "  • Log Analytics workspace" -ForegroundColor White

Write-Host "`n🛡️ Security Features:" -ForegroundColor Cyan
Write-Host "  • Web Application Firewall protection" -ForegroundColor White
Write-Host "  • Private networking for Container Apps" -ForegroundColor White
Write-Host "  • VNet isolation" -ForegroundColor White
Write-Host "  • Managed identity authentication" -ForegroundColor White

# Confirm deployment
$confirm = Read-Host "`nDo you want to proceed with the deployment? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}

# Deploy infrastructure
Write-Host "`n🏗️ Provisioning infrastructure..." -ForegroundColor Yellow
Write-Host "This may take 10-15 minutes due to Application Gateway deployment" -ForegroundColor Cyan

try {
    azd provision

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Infrastructure provisioned successfully!" -ForegroundColor Green
        
        # Deploy application
        Write-Host "`n📦 Deploying application..." -ForegroundColor Yellow
        azd deploy
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n🎉 Deployment completed successfully!" -ForegroundColor Green
            
            # Get deployment outputs
            Write-Host "`n📋 Deployment Information:" -ForegroundColor Cyan
            $outputs = azd env get-values | ConvertFrom-StringData
            
            if ($outputs.APPLICATION_GATEWAY_FQDN) {
                Write-Host "🌐 Application URL: http://$($outputs.APPLICATION_GATEWAY_FQDN)" -ForegroundColor Green
                Write-Host "🔒 Protected by Web Application Firewall" -ForegroundColor Yellow
            }
            
            if ($outputs.APPLICATION_INSIGHTS_NAME) {
                Write-Host "📊 Application Insights: $($outputs.APPLICATION_INSIGHTS_NAME)" -ForegroundColor Cyan
            }
            
            Write-Host "`n🔧 Next Steps:" -ForegroundColor Cyan
            Write-Host "  1. Test the application at the URL above" -ForegroundColor White
            Write-Host "  2. Configure SSL certificate for HTTPS" -ForegroundColor White
            Write-Host "  3. Review WAF logs in Azure portal" -ForegroundColor White
            Write-Host "  4. Set up monitoring alerts" -ForegroundColor White
            
        } else {
            Write-Host "`n❌ Application deployment failed" -ForegroundColor Red
            Write-Host "Infrastructure is provisioned, but application deployment encountered issues." -ForegroundColor Yellow
            Write-Host "Check the logs above and run 'azd deploy' again if needed." -ForegroundColor Yellow
        }
    } else {
        Write-Host "`n❌ Infrastructure provisioning failed" -ForegroundColor Red
        Write-Host "Check the logs above for error details." -ForegroundColor Yellow
    }
} catch {
    Write-Host "`n❌ Deployment failed with error: $_" -ForegroundColor Red
}

Write-Host "`n📚 For more information, see infra/ARCHITECTURE.md" -ForegroundColor Cyan
