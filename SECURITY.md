# Security Policy

## Supported Versions

We actively support the following versions of the LEGO Python Programming Learning Platform:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |
| Previous| ⚠️ Limited support |
| Older   | ❌ No              |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Open a Public Issue
Please do not report security vulnerabilities through public GitHub issues.

### 2. Report Privately
- **Email**: Report to the repository maintainers
- **GitHub Security**: Use GitHub's private vulnerability reporting feature
- **Details**: Include as much information as possible

### 3. Information to Include
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if available)
- Your contact information

### 4. Response Timeline
- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix**: Depends on severity and complexity
- **Disclosure**: After fix is deployed

## Security Measures

### Application Security
- **HTTPS Only**: All traffic encrypted in transit
- **Container Security**: Non-root user, minimal base image
- **Dependency Scanning**: Regular security updates
- **Input Validation**: Proper sanitization of user inputs

### Infrastructure Security
- **Managed Identity**: No stored credentials
- **Key Vault**: Secure secrets management
- **Network Security**: Proper firewall and access controls
- **Monitoring**: Security event logging and alerting

### Data Protection
- **No Personal Data**: Platform doesn't collect personal information
- **Session Security**: Secure session management
- **CORS Policy**: Proper cross-origin resource sharing
- **Content Security**: Prevent XSS and injection attacks

## Security Best Practices for Contributors

### Code Security
- Validate all user inputs
- Use parameterized queries
- Implement proper error handling
- Follow secure coding guidelines

### Dependencies
- Keep dependencies updated
- Review security advisories
- Use known secure packages
- Regular dependency audits

### Infrastructure
- Follow Azure security best practices
- Use managed identities
- Implement least privilege access
- Regular security reviews

## Scope

This security policy applies to:
- The main application code
- Infrastructure as Code (Bicep templates)
- CI/CD pipelines
- Documentation and examples

## Out of Scope
- Third-party dependencies (report to their maintainers)
- General Azure platform issues (report to Microsoft)
- Educational content accuracy (use content issue templates)

## Security Contact

For security-related questions or concerns, please contact the project maintainers through GitHub's private communication channels.

---

Thank you for helping keep our educational platform secure! 🔒
