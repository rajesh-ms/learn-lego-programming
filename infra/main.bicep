targetScope = 'resourceGroup'

// Parameters
@minLength(1)
@maxLength(64)
@description('Name of the environment that can be used as part of naming resource convention')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Node.js environment (development/production)')
param nodeEnv string = 'production'

@description('Port for the application')
param port string = '3000'

// Variables
var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, resourceGroup().id, environmentName))
var tags = { 'azd-env-name': environmentName }

// Network configuration
var vnetAddressPrefix = '10.0.0.0/16'
var containerAppSubnetAddressPrefix = '10.0.1.0/24'
var appGatewaySubnetAddressPrefix = '10.0.2.0/24'
var privateEndpointSubnetAddressPrefix = '10.0.3.0/24'

// User-assigned managed identity for secure resource access
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${abbrs.managedIdentityUserAssignedIdentities}${resourceToken}'
  location: location
  tags: tags
}

// Virtual Network with subnets for secure networking
resource vnet 'Microsoft.Network/virtualNetworks@2023-04-01' = {
  name: '${abbrs.networkVirtualNetworks}${resourceToken}'
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [vnetAddressPrefix]
    }
    subnets: [
      {
        name: 'container-app-subnet'
        properties: {
          addressPrefix: containerAppSubnetAddressPrefix
          delegations: [
            {
              name: 'Microsoft.App/environments'
              properties: {
                serviceName: 'Microsoft.App/environments'
              }
            }
          ]
        }
      }
      {
        name: 'app-gateway-subnet'
        properties: {
          addressPrefix: appGatewaySubnetAddressPrefix
        }
      }
      {
        name: 'private-endpoint-subnet'
        properties: {
          addressPrefix: privateEndpointSubnetAddressPrefix
          privateEndpointNetworkPolicies: 'Disabled'
        }
      }
    ]
  }
}

// Public IP for Application Gateway
resource appGatewayPublicIP 'Microsoft.Network/publicIPAddresses@2023-04-01' = {
  name: '${abbrs.networkPublicIPAddresses}${resourceToken}'
  location: location
  tags: tags
  sku: {
    name: 'Standard'
    tier: 'Regional'
  }
  properties: {
    publicIPAllocationMethod: 'Static'
    dnsSettings: {
      domainNameLabel: 'lego-${resourceToken}'
    }
  }
}

// Log Analytics workspace for monitoring and logging
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
  location: location
  tags: tags
  properties: {
    retentionInDays: 30
    sku: {
      name: 'PerGB2018'
    }
  }
}

// Application Insights for application monitoring
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${abbrs.insightsComponents}${resourceToken}'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspace.id
  }
}

// Key Vault for secure storage of secrets
resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: '${abbrs.keyVaultVaults}${resourceToken}'
  location: location
  tags: tags
  properties: {
    tenantId: subscription().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    }
    accessPolicies: [
      {
        objectId: managedIdentity.properties.principalId
        tenantId: subscription().tenantId
        permissions: {
          secrets: ['get', 'list']
        }
      }
    ]
    enabledForTemplateDeployment: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enableRbacAuthorization: false
  }
}

// Container Registry for storing container images
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name: '${abbrs.containerRegistryRegistries}${resourceToken}'
  location: location
  tags: tags
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: false
    publicNetworkAccess: 'Enabled'
  }
}

// Role assignment for managed identity to pull from container registry
resource acrPullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: containerRegistry
  name: guid(containerRegistry.id, managedIdentity.id, 'acrPull')
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d') // AcrPull
    principalId: managedIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Container Apps Environment with VNet integration
resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: '${abbrs.appManagedEnvironments}${resourceToken}'
  location: location
  tags: tags
  properties: {
    vnetConfiguration: {
      infrastructureSubnetId: vnet.properties.subnets[0].id
      internal: true
    }
    workloadProfiles: [
      {
        name: 'Consumption'
        workloadProfileType: 'Consumption'
      }
    ]
  }
}

// Container App for the LEGO learning platform (internal only)
resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: '${abbrs.appContainerApps}${resourceToken}'
  location: location
  tags: union(tags, { 'azd-service-name': 'learn-lego-webapp' })
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    environmentId: containerAppsEnvironment.id
    configuration: {
      ingress: {
        external: false
        targetPort: 3000
        allowInsecure: false
        transport: 'http'
      }
      registries: [
        {
          server: containerRegistry.properties.loginServer
          identity: managedIdentity.id
        }
      ]
    }
    template: {
      containers: [
        {
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          name: 'learn-lego-webapp'
          env: [
            {
              name: 'NODE_ENV'
              value: nodeEnv
            }
            {
              name: 'PORT'
              value: port
            }
            {
              name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
              value: applicationInsights.properties.ConnectionString
            }
          ]
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 10
        rules: [
          {
            name: 'http-rule'
            http: {
              metadata: {
                concurrentRequests: '100'
              }
            }
          }        ]
      }
    }
  }
}

// Application Gateway with WAF for secure public access
resource applicationGateway 'Microsoft.Network/applicationGateways@2023-04-01' = {
  name: '${abbrs.networkApplicationGateways}${resourceToken}'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'WAF_v2'
      tier: 'WAF_v2'
      capacity: 1
    }
    gatewayIPConfigurations: [
      {
        name: 'appGatewayIpConfig'
        properties: {
          subnet: {
            id: vnet.properties.subnets[1].id
          }
        }
      }
    ]
    frontendIPConfigurations: [
      {
        name: 'appGatewayFrontendIP'
        properties: {
          publicIPAddress: {
            id: appGatewayPublicIP.id
          }
        }
      }
    ]
    frontendPorts: [
      {
        name: 'appGatewayFrontendPort80'
        properties: {
          port: 80
        }
      }
      {
        name: 'appGatewayFrontendPort443'
        properties: {
          port: 443
        }      }
    ]
    backendAddressPools: [
      {
        name: 'appGatewayBackendPool'
        properties: {
          backendAddresses: [
            {
              fqdn: '${containerApp.name}.${containerAppsEnvironment.properties.defaultDomain}'
            }
          ]
        }
      }
    ]
    backendHttpSettingsCollection: [
      {
        name: 'appGatewayBackendHttpSettings'
        properties: {
          port: 80
          protocol: 'Http'
          cookieBasedAffinity: 'Disabled'
          requestTimeout: 20
          probe: {
            id: resourceId('Microsoft.Network/applicationGateways/probes', '${abbrs.networkApplicationGateways}${resourceToken}', 'healthProbe')
          }
        }
      }
    ]
    httpListeners: [
      {
        name: 'appGatewayHttpListener'
        properties: {
          frontendIPConfiguration: {
            id: resourceId('Microsoft.Network/applicationGateways/frontendIPConfigurations', '${abbrs.networkApplicationGateways}${resourceToken}', 'appGatewayFrontendIP')
          }
          frontendPort: {
            id: resourceId('Microsoft.Network/applicationGateways/frontendPorts', '${abbrs.networkApplicationGateways}${resourceToken}', 'appGatewayFrontendPort80')
          }
          protocol: 'Http'
        }
      }
    ]
    requestRoutingRules: [
      {
        name: 'appGatewayRoutingRule'
        properties: {
          ruleType: 'Basic'
          priority: 100
          httpListener: {
            id: resourceId('Microsoft.Network/applicationGateways/httpListeners', '${abbrs.networkApplicationGateways}${resourceToken}', 'appGatewayHttpListener')
          }
          backendAddressPool: {
            id: resourceId('Microsoft.Network/applicationGateways/backendAddressPools', '${abbrs.networkApplicationGateways}${resourceToken}', 'appGatewayBackendPool')
          }
          backendHttpSettings: {
            id: resourceId('Microsoft.Network/applicationGateways/backendHttpSettingsCollection', '${abbrs.networkApplicationGateways}${resourceToken}', 'appGatewayBackendHttpSettings')
          }
        }
      }    ]
    probes: [
      {
        name: 'healthProbe'
        properties: {
          protocol: 'Http'
          path: '/'
          interval: 30
          timeout: 30
          unhealthyThreshold: 3
          pickHostNameFromBackendHttpSettings: true
          minServers: 0
          match: {
            statusCodes: ['200-399']
          }
        }
      }
    ]
    webApplicationFirewallConfiguration: {
      enabled: true
      firewallMode: 'Detection'
      ruleSetType: 'OWASP'
      ruleSetVersion: '3.2'
      disabledRuleGroups: []
      exclusions: []
      requestBodyCheck: true
      maxRequestBodySizeInKb: 128
      fileUploadLimitInMb: 100
    }
  }
}

// Outputs
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = subscription().tenantId
output AZURE_SUBSCRIPTION_ID string = subscription().subscriptionId
output AZURE_RESOURCE_GROUP string = resourceGroup().name
output RESOURCE_GROUP_ID string = resourceGroup().id

// Container Registry
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerRegistry.properties.loginServer
output AZURE_CONTAINER_REGISTRY_NAME string = containerRegistry.name

// Container Apps
output AZURE_CONTAINER_APPS_ENVIRONMENT_ID string = containerAppsEnvironment.id
output AZURE_CONTAINER_APP_NAME string = containerApp.name
output AZURE_CONTAINER_APP_INTERNAL_URL string = 'https://${containerApp.properties.configuration.ingress.fqdn}'

// Application Gateway (public endpoint)
output APPLICATION_GATEWAY_PUBLIC_IP string = appGatewayPublicIP.properties.ipAddress
output APPLICATION_GATEWAY_FQDN string = appGatewayPublicIP.properties.dnsSettings.fqdn
output APPLICATION_GATEWAY_URL string = 'http://${appGatewayPublicIP.properties.dnsSettings.fqdn}'
output WEB_URI string = 'http://${appGatewayPublicIP.properties.dnsSettings.fqdn}'

// Network
output VNET_ID string = vnet.id
output VNET_NAME string = vnet.name

// Key Vault
output AZURE_KEY_VAULT_ENDPOINT string = keyVault.properties.vaultUri
output AZURE_KEY_VAULT_NAME string = keyVault.name

// Application Insights
output APPLICATION_INSIGHTS_CONNECTION_STRING string = applicationInsights.properties.ConnectionString
output APPLICATION_INSIGHTS_NAME string = applicationInsights.name

// Log Analytics
output LOG_ANALYTICS_WORKSPACE_ID string = logAnalyticsWorkspace.id
output LOG_ANALYTICS_WORKSPACE_NAME string = logAnalyticsWorkspace.name
