# LEGO Learning Platform - Secure Azure Architecture

## Overview
This document describes the secure, production-ready Azure architecture for the LEGO Programming Learning Platform, featuring VNet integration, Application Gateway with Web Application Firewall (WAF), and private networking.

## Architecture Components

### Network Architecture
```
Internet → Application Gateway (WAF) → VNet → Container Apps Environment → Container App
```

### Resource Overview

#### 1. Virtual Network (VNet)
- **Purpose**: Provides secure, isolated networking for all resources
- **Address Space**: `10.0.0.0/16`
- **Subnets**:
  - `container-app-subnet` (`10.0.1.0/24`): Dedicated to Container Apps with service delegation
  - `app-gateway-subnet` (`10.0.2.0/24`): Application Gateway subnet
  - `private-endpoint-subnet` (`10.0.3.0/24`): For future private endpoints

#### 2. Application Gateway with WAF
- **SKU**: WAF_v2 (Standard_v2 with Web Application Firewall)
- **Capacity**: Auto-scaling (minimum 1 instance)
- **Features**:
  - OWASP 3.2 rule set for protection against common web attacks
  - Detection mode (can be switched to Prevention)
  - Health probes for backend monitoring
  - SSL termination capability (HTTPS ready)
  - Request routing and load balancing

#### 3. Container Apps Environment
- **Configuration**: Internal (private) with VNet integration
- **Features**:
  - Integrated with Log Analytics for monitoring
  - Workload profiles for different compute requirements
  - Private networking (not directly accessible from internet)

#### 4. Container App
- **Exposure**: Internal only (external: false)
- **Access**: Only accessible through Application Gateway
- **Security**: Managed identity for secure resource access

#### 5. Supporting Resources
- **Container Registry**: Stores application container images
- **Key Vault**: Secure storage for secrets and certificates
- **Application Insights**: Application performance monitoring
- **Log Analytics**: Centralized logging and analytics

## Security Features

### Web Application Firewall (WAF)
- **Protection Against**:
  - SQL injection attacks
  - Cross-site scripting (XSS)
  - Cross-site request forgery (CSRF)
  - DDoS attacks
  - Common OWASP Top 10 vulnerabilities
- **Rule Set**: OWASP 3.2 with customizable rules
- **Mode**: Detection (logs threats) - can be upgraded to Prevention

### Network Security
- **Private Networking**: Container App is not directly accessible from the internet
- **VNet Integration**: All traffic flows through secure virtual network
- **Subnet Isolation**: Different components in separate subnets
- **Private Endpoints**: Ready for future implementation for services like Key Vault

### Identity and Access Management
- **Managed Identity**: Container App uses system-assigned managed identity
- **RBAC**: Role-based access control for Azure resources
- **Key Vault Integration**: Secure secret management

## Deployment Flow

### 1. Infrastructure Deployment
```powershell
# Deploy infrastructure
azd provision

# Deploy application
azd deploy
```

### 2. Traffic Flow
1. **User Request** → Application Gateway public IP
2. **WAF Processing** → Security rules applied, malicious requests blocked
3. **Load Balancing** → Request routed to healthy backend
4. **VNet Routing** → Traffic sent through container app subnet
5. **Container App** → Application processes request
6. **Response** → Same path in reverse

### 3. Monitoring and Logging
- **Application Gateway Logs**: WAF logs, access logs, performance metrics
- **Container App Logs**: Application logs sent to Log Analytics
- **Application Insights**: Performance monitoring, dependency tracking
- **Health Monitoring**: Automatic health probes and failover

## Configuration Details

### Application Gateway Configuration
- **Frontend**: Public IP with DNS name
- **Backend Pool**: Container App internal FQDN
- **Health Probe**: HTTP health check on root path (`/`)
- **Listener**: HTTP on port 80 (HTTPS can be added with certificates)
- **Routing**: Basic routing rule for all traffic

### WAF Configuration
- **Firewall Mode**: Detection (can be changed to Prevention)
- **Rule Set**: OWASP 3.2
- **Request Body Check**: Enabled (max 128KB)
- **File Upload Limit**: 100MB
- **Custom Rules**: Can be added for specific requirements

### Container Apps Configuration
- **Ingress**: Internal only, HTTP on port 3000
- **Scaling**: 1-10 replicas based on HTTP requests
- **Resources**: 0.25 CPU, 0.5GB memory per replica
- **Environment Variables**: Application Insights connection string

## Security Best Practices Implemented

1. **Defense in Depth**: Multiple layers of security (WAF, VNet, private networking)
2. **Least Privilege**: Minimal required permissions for managed identity
3. **Network Isolation**: Private subnets with appropriate delegation
4. **Monitoring**: Comprehensive logging and alerting
5. **Secure Communication**: HTTPS-ready infrastructure
6. **Secret Management**: Key Vault for sensitive configuration

## Future Enhancements

### 1. HTTPS/SSL Termination
- Add SSL certificate to Application Gateway
- Configure HTTPS listeners and redirect HTTP to HTTPS
- Implement certificate auto-renewal

### 2. Private Endpoints
- Add private endpoints for Key Vault
- Configure private DNS zones
- Further isolate backend services

### 3. Advanced WAF Rules
- Custom WAF rules for application-specific threats
- IP allowlist/blocklist
- Rate limiting and bot protection

### 4. Multi-Region Deployment
- Traffic Manager for global load balancing
- Cross-region replication for disaster recovery
- Azure Front Door for global CDN

### 5. Advanced Monitoring
- Custom dashboards in Azure Monitor
- Alert rules for security events
- Integration with Azure Sentinel for SIEM

## Cost Optimization

### Current Tier Selections
- **Application Gateway**: WAF_v2 (production-ready with security)
- **Container Apps**: Consumption plan (pay-per-use)
- **Container Registry**: Basic (sufficient for small projects)
- **Log Analytics**: Pay-per-GB ingestion

### Cost Management Tips
- Monitor WAF_v2 capacity units usage
- Use consumption-based Container Apps scaling
- Implement log retention policies
- Consider reserved instances for predictable workloads

## Troubleshooting

### Common Issues
1. **502 Bad Gateway**: Check Container App health and internal connectivity
2. **WAF Blocking Legitimate Traffic**: Review WAF logs and adjust rules
3. **Slow Response Times**: Check Application Gateway health probes and backend response times
4. **Connection Timeouts**: Verify VNet configuration and NSG rules

### Diagnostic Commands
```powershell
# Check Application Gateway status
az network application-gateway show --name <gateway-name> --resource-group <rg-name>

# View WAF logs
az monitor log-analytics query --workspace <workspace-id> --analytics-query "AzureDiagnostics | where Category == 'ApplicationGatewayFirewallLog'"

# Check Container App status
az containerapp show --name <app-name> --resource-group <rg-name>
```

## Compliance and Governance

This architecture supports various compliance requirements:
- **PCI DSS**: WAF protection, network isolation
- **GDPR**: Data protection through encryption and access controls
- **SOC 2**: Comprehensive logging and monitoring
- **ISO 27001**: Security controls and risk management

The infrastructure follows Azure Well-Architected Framework principles for reliability, security, cost optimization, operational excellence, and performance efficiency.
