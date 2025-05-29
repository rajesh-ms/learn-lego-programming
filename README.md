# LEGO Python Programming Learning Platform 🤖

A comprehensive web-based learning platform for teaching LEGO robotics programming using Python. This interactive educational resource provides step-by-step lessons, hands-on projects, and coding examples for students learning robotics programming.

[![Deployed on Azure](https://img.shields.io/badge/Deployed%20on-Azure%20Container%20Apps-blue?logo=microsoft-azure)](https://ca-4qqvoafud54ik.victorioussmoke-3eca8c2b.eastus.azurecontainerapps.io/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Features

- **Interactive Lessons**: 6 comprehensive units covering robotics fundamentals to advanced topics
- **Code Playground**: Interactive code editor with simulation feedback
- **Real Projects**: Complete robot projects with step-by-step instructions
- **Syntax Highlighting**: Beautiful code examples with copy functionality  
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, educational interface built with Tailwind CSS
- **Progress Tracking**: Navigate through structured learning paths
- **Learning Resources**: Comprehensive guides, tools, and references
- **Cloud Deployment**: Fully containerized and deployed on Azure Container Apps

## 🌐 Live Application

- **Production**: [https://ca-4qqvoafud54ik.victorioussmoke-3eca8c2b.eastus.azurecontainerapps.io/](https://ca-4qqvoafud54ik.victorioussmoke-3eca8c2b.eastus.azurecontainerapps.io/)
- **Development Server**: http://localhost:3001
- **Built with**: Next.js 15.3.2, TypeScript, Tailwind CSS
- **Deployment**: Azure Container Apps with Infrastructure as Code (Bicep)


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
- **Deployment**: Azure Container Apps
- **Infrastructure**: Bicep (Infrastructure as Code)
- **Containerization**: Docker with multi-stage builds

## 🚀 Deployment Architecture

This application is deployed on **Azure Container Apps** with the following architecture:

- **Container Registry**: Azure Container Registry for Docker images
- **Container Apps**: Serverless container hosting with auto-scaling
- **Application Insights**: Monitoring and telemetry
- **Log Analytics**: Centralized logging and diagnostics
- **Key Vault**: Secure secrets management
- **Managed Identity**: Azure AD authentication for secure resource access

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

This project includes complete Infrastructure as Code (IaC) using Bicep templates and Azure Developer CLI (azd) for easy deployment.

### Prerequisites
- Azure CLI
- Azure Developer CLI (azd)
- Docker Desktop

### Deploy to Azure

1. **Initialize Azure Developer CLI**
   ```bash
   azd init
   ```

2. **Deploy to Azure**
   ```bash
   azd up
   ```

This will:
- Create all required Azure resources using Bicep templates
- Build and push the Docker image to Azure Container Registry
- Deploy the application to Azure Container Apps
- Configure monitoring and logging

### Infrastructure Components

- **Resource Group**: `rg-learn-lego-{env}`
- **Container Registry**: `cr{resourceToken}`
- **Container Apps Environment**: `cae-{resourceToken}`
- **Container App**: `ca-{resourceToken}`
- **Log Analytics Workspace**: `log-{resourceToken}`
- **Application Insights**: `appi-{resourceToken}`
- **Key Vault**: `kv-{resourceToken}`
- **Managed Identity**: `id-{resourceToken}`

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

## 🔒 Security Features

- **Managed Identity**: No stored secrets for Azure resource access
- **Key Vault**: Secure storage for sensitive configuration
- **Container Security**: Non-root user, minimal base image
- **HTTPS Only**: All traffic encrypted in transit
- **Resource Isolation**: Dedicated container environment

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
