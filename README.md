# LEGO Python Programming Learning Platform 🤖

A comprehensive web-based learning platform for teaching LEGO robotics programming using Python. This interactive educational resource provides step-by-step lessons, hands-on projects, and coding examples for students learning robotics programming.

[![Deployed on Azure](https://img.shields.io/badge/Deployed%20on-Azure%20Container%20Apps-blue?logo=microsoft-azure)](https://azure.microsoft.com/services/container-apps/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Secured by WAF](https://img.shields.io/badge/Secured%20by-Azure%20WAF-red?logo=microsoft-azure)](https://azure.microsoft.com/services/web-application-firewall/)

## 🚀 Features

- **Interactive Lessons**: 6 comprehensive units covering robotics fundamentals to advanced topics
- **Code Playground**: Interactive code editor with simulation feedback
- **Real Projects**: Complete robot projects with step-by-step instructions
- **Syntax Highlighting**: Beautiful code examples with copy functionality  
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, educational interface built with Tailwind CSS
- **Progress Tracking**: Navigate through structured learning paths
- **Learning Resources**: Comprehensive guides, tools, and references
- **Secure Architecture**: Protected by Azure Application Gateway with Web Application Firewall
- **Enterprise-Grade**: VNet isolation, private networking, and comprehensive monitoring

## 🔒 Security & Architecture

This platform is built with enterprise-grade security and follows Azure Well-Architected Framework principles:

- **🛡️ Web Application Firewall**: OWASP 3.2 protection against common web attacks
- **🌐 Private Networking**: Container Apps deployed in isolated VNet subnets
- **🔐 Zero-Trust Architecture**: Application Gateway as the only public entry point
- **📊 Comprehensive Monitoring**: Application Insights, Log Analytics, and WAF logging
- **🚀 Auto-Scaling**: Container Apps with consumption-based scaling
- **🔑 Managed Identity**: Secure, passwordless authentication between Azure services

See [Infrastructure Architecture](./infra/ARCHITECTURE.md) for detailed security and deployment information.

## 🌐 Live Application

The application is deployed with a secure, production-ready architecture on Azure:

- **Public Access**: Through Azure Application Gateway with WAF protection
- **Internal Services**: Private Container Apps Environment with VNet integration
- **Monitoring**: Real-time telemetry and security monitoring
- **Deployment**: Infrastructure as Code using Azure Bicep


## 📚 Curriculum Structure

### Unit 1: Overview (30 min)
Introduction to LEGO robotics and programming concepts

### Unit 2: Hub/Software (45 min)
Getting started with LEGO hardware and software setup

### Unit 3: Python Fundamentals (60 min)
Basic Python programming concepts for robotics - variables, functions, loops, and conditions

### Unit 4: Movement (75 min)
Programming robot movement and motor controls with precise distance and angle control

### Unit 5: Sensors/Outputs (90 min)
Working with sensors (distance, color, touch) and output devices (lights, sounds, display)

### Unit 6: Advanced Programming (120 min)
Complex topics like PID controllers, line following, and autonomous navigation

## 🌐 Application Pages

- **Homepage**: Overview of curriculum with unit navigation and quick access to key features
- **Learning Units**: 6 detailed units with lessons, objectives, and interactive code examples
- **Projects**: Complete robot projects including line follower, obstacle avoidance, and remote control
- **Demo**: Interactive demonstration of robot square movement with code playground
- **Resources**: Comprehensive learning materials, tools, and quick reference guides
- **Progress**: Track learning progress through units with visual progress indicators
- **Help**: FAQs, troubleshooting guides, and support resources
- **About**: Platform information and curriculum source attribution

## 🎮 Interactive Features

- **Code Playground**: Live code editor with simulation output for experimentation
- **Syntax Highlighting**: Professional code display with copy-to-clipboard functionality
- **Progress Tracking**: Visual progress bars and achievement system
- **Responsive Navigation**: Seamless navigation between units and sections
- **Mobile-Friendly**: Optimized for learning on all devices

## 🛠️ Technology Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: React Syntax Highlighter with Prism
- **Code Examples**: Python with PyBricks library
- **Infrastructure**: Azure Bicep (Infrastructure as Code)
- **Containerization**: Docker with multi-stage builds
- **Security**: Azure Application Gateway with WAF
- **Monitoring**: Application Insights, Log Analytics

## 🏗️ Secure Cloud Architecture

This application deploys with enterprise-grade security on **Azure** using a multi-layered architecture:

### 🌐 Network Architecture
```
Internet → Application Gateway (WAF) → VNet → Container Apps Environment → Container App
```

### 🔧 Infrastructure Components
- **Application Gateway with WAF**: Public entry point with OWASP 3.2 protection
- **Virtual Network**: Isolated networking with dedicated subnets
- **Container Apps Environment**: Private, VNet-integrated container hosting
- **Container Registry**: Secure Docker image storage
- **Application Insights**: Real-time performance monitoring
- **Log Analytics**: Centralized logging and security analytics
- **Key Vault**: Encrypted secrets and certificate management
- **Managed Identity**: Passwordless authentication between services

### 🛡️ Security Features
- **WAF Protection**: Blocks SQL injection, XSS, and OWASP Top 10 attacks
- **Private Networking**: Container App not directly accessible from internet
- **VNet Isolation**: Network segmentation with dedicated subnets
- **Zero-Trust Model**: Application Gateway as single point of entry
- **Comprehensive Monitoring**: Security events and performance metrics

## 🚀 Quick Deployment

Deploy the secure infrastructure and application with one command:

```powershell
# Clone and navigate to the project
git clone https://github.com/your-org/learn-lego-programming.git
cd learn-lego-programming

# Deploy secure infrastructure
./infra/deploy.ps1
```

This will provision:
- ✅ Application Gateway with WAF
- ✅ Private VNet with Container Apps
- ✅ Monitoring and logging
- ✅ Security scanning and validation

## 🏃‍♂️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajesh-ms/learn-lego-programming.git
   cd learn-lego-programming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to start learning!

## 🐳 Docker Development

1. **Build the Docker image**
   ```bash
   docker build -t learn-lego .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 learn-lego
   ```

## ☁️ Azure Deployment

This project includes complete **Infrastructure as Code (IaC)** using Bicep templates with enterprise-grade security for production deployment.

### Prerequisites
- Azure CLI (`az login`)
- Azure Developer CLI (`azd`)
- Docker Desktop
- PowerShell (for deployment scripts)

### 🚀 Secure Production Deployment

**Option 1: Quick Deployment**
```powershell
# Use the automated deployment script
./infra/deploy.ps1
```

**Option 2: Manual Deployment**
```bash
# Initialize and deploy
azd init
azd up
```

This will create a **secure, production-ready infrastructure**:

### 🏗️ Infrastructure Components

#### Public Layer
- **Application Gateway**: `agw-{resourceToken}` with WAF protection
- **Public IP**: `pip-{resourceToken}` with DNS name

#### Network Layer  
- **Virtual Network**: `vnet-{resourceToken}` (10.0.0.0/16)
  - Container Apps Subnet (10.0.1.0/24)
  - Application Gateway Subnet (10.0.2.0/24)
  - Private Endpoint Subnet (10.0.3.0/24)

#### Application Layer
- **Container Apps Environment**: `cae-{resourceToken}` (private, VNet-integrated)
- **Container App**: `ca-{resourceToken}` (internal ingress only)
- **Container Registry**: `cr{resourceToken}`

#### Security & Monitoring
- **Key Vault**: `kv-{resourceToken}` (secrets management)
- **Application Insights**: `appi-{resourceToken}` (telemetry)
- **Log Analytics**: `log-{resourceToken}` (logging)
- **Managed Identity**: `id-{resourceToken}` (authentication)

### 🛠️ Management Scripts

```powershell
# Monitor infrastructure health
./infra/monitor.ps1 -Health

# Security validation and testing
./infra/security-test.ps1 -WafTest

# Detailed monitoring with WAF logs
./infra/monitor.ps1 -Detailed -WafLogsHours 24
```

### 🔄 Deployment Process

1. **Infrastructure Validation**: Bicep template validation
2. **Security Configuration**: WAF rules, private networking
3. **Resource Provisioning**: ~10-15 minutes (Application Gateway)
4. **Application Deployment**: Container build and deployment
5. **Health Verification**: Endpoint and security testing

### 📊 Post-Deployment

After successful deployment:
- ✅ Access application via Application Gateway FQDN
- ✅ Monitor security events in Azure portal
- ✅ Review WAF logs for blocked attacks
- ✅ Configure HTTPS with SSL certificates
- ✅ Set up alerting and monitoring rules

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `azd up` - Deploy to Azure
- `azd down` - Remove Azure resources

## 🎯 Learning Objectives

Students will learn to:
- Program LEGO robots using Python
- Understand robotics fundamentals and applications
- Work with sensors, motors, and the LEGO hub
- Build real-world robotic solutions
- Apply programming concepts to physical systems

## 📊 Performance & Monitoring

The application includes:
- **Application Insights**: Real-time performance monitoring
- **Log Analytics**: Comprehensive logging and diagnostics
- **Health Checks**: Container health monitoring
- **Auto-scaling**: Automatic scaling based on demand
- **SSL/TLS**: Secure HTTPS connections

## 🔒 Enterprise Security Features

### 🛡️ Web Application Firewall (WAF)
- **OWASP 3.2 Rule Set**: Protection against top web vulnerabilities
- **SQL Injection Protection**: Blocks database attack attempts
- **XSS Prevention**: Filters cross-site scripting attacks
- **DDoS Mitigation**: Built-in distributed denial of service protection
- **Custom Rules**: Configurable security policies

### 🌐 Network Security
- **Private Networking**: Container Apps not directly accessible from internet
- **VNet Isolation**: Dedicated virtual network with subnet segmentation
- **Zero-Trust Architecture**: Application Gateway as single entry point
- **Internal Traffic Only**: Backend services communicate over private network
- **Network Security Groups**: Configurable traffic filtering rules

### 🔐 Identity & Access Management
- **Managed Identity**: Passwordless authentication between Azure services
- **Key Vault Integration**: Encrypted storage for secrets and certificates
- **RBAC**: Role-based access control with least privilege principle
- **Azure AD Integration**: Enterprise identity management

### 📊 Security Monitoring
- **WAF Logs**: Real-time attack detection and blocking
- **Security Analytics**: Log Analytics integration for threat analysis
- **Application Insights**: Performance and security event monitoring
- **Alert Rules**: Automated notifications for security events
- **Compliance Reporting**: Built-in security and compliance dashboards

## 📈 Performance & Scalability

- **Auto-scaling**: Container Apps scale 1-10 replicas based on demand
- **Load Balancing**: Application Gateway distributes traffic efficiently
- **Health Probes**: Automatic health monitoring and failover
- **CDN Ready**: Optimized for Azure Front Door integration
- **Global Deployment**: Multi-region architecture support

## 📖 Curriculum Source

This platform is based on the excellent educational content from [PrimeLessons.org](https://primelessons.org/en/PyLessons.html), adapted for an interactive web-based learning experience.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please refer to the original curriculum source for licensing information.

---

Happy robot programming! 🤖✨
