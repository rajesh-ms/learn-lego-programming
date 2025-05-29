# Contributing to LEGO Python Programming Learning Platform

Thank you for your interest in contributing to our educational platform! This guide will help you understand how to contribute effectively.

## 🎯 Our Mission

We're building an interactive, accessible, and comprehensive learning platform for LEGO robotics programming. Every contribution should support our educational goals and improve the learning experience.

## 🛠️ Development Setup

### Prerequisites
- Node.js 20 or later
- npm or yarn
- Git
- Docker (for testing containerization)
- Azure CLI (for deployment testing)

### Local Development
1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/learn-lego-programming.git
   cd learn-lego-programming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit http://localhost:3000

## 📝 Contribution Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use Tailwind CSS for styling
- Write semantic HTML for accessibility
- Include appropriate comments for complex logic

### Educational Content
- Ensure accuracy of all programming concepts
- Use clear, age-appropriate language
- Include practical examples and exercises
- Test all code examples thoroughly
- Consider different learning styles

### Accessibility
- Use proper heading hierarchy (h1 → h2 → h3)
- Include alt text for images
- Ensure keyboard navigation works
- Maintain good color contrast ratios
- Test with screen readers when possible

## 🔄 Contribution Workflow

### 1. Planning
- Check existing issues and discussions
- Open an issue to discuss major changes
- Clarify requirements and acceptance criteria

### 2. Development
- Create a feature branch from `main`
- Make your changes in small, logical commits
- Write clear commit messages
- Test your changes thoroughly

### 3. Testing
- Run the linter: `npm run lint`
- Build the application: `npm run build`
- Test on multiple devices/browsers
- Verify educational accuracy

### 4. Submission
- Open a pull request with a clear description
- Fill out the PR template completely
- Respond to code review feedback
- Ensure CI checks pass

## 📚 Types of Contributions

### 🐛 Bug Fixes
- Fix broken functionality
- Improve error handling
- Resolve accessibility issues
- Performance optimizations

### ✨ New Features
- Interactive learning components
- New educational content
- Improved user experience
- Enhanced code playground

### 📖 Content Improvements
- Clearer explanations
- Additional code examples
- Updated curriculum content
- Better visual aids

### 🏗️ Infrastructure
- Deployment improvements
- Development tooling
- CI/CD enhancements
- Performance monitoring

## 🧪 Testing Guidelines

### Manual Testing
- Test all new features thoroughly
- Verify on different screen sizes
- Check browser compatibility
- Validate educational accuracy

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] Educational content is accurate
- [ ] Accessibility standards met
- [ ] No console errors or warnings
- [ ] Mobile-responsive design
- [ ] Performance impact considered

## 📐 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── units/          # Educational units
│   ├── projects/       # Project pages
│   └── ...             # Other pages
├── components/         # Reusable components
│   ├── ui/            # UI components
│   └── lesson/        # Educational components
├── lib/               # Utilities and helpers
└── types/             # TypeScript definitions

infra/                 # Azure infrastructure
├── main.bicep         # Main infrastructure template
├── main.parameters.json # Deployment parameters
└── abbreviations.json # Resource naming

.github/               # GitHub workflows and templates
├── workflows/         # CI/CD pipelines
└── ISSUE_TEMPLATE/    # Issue templates
```

## 🏷️ Commit Message Guidelines

Use clear, descriptive commit messages:

```
type(scope): description

Examples:
feat(units): add Unit 6 advanced programming content
fix(playground): resolve code execution timeout issue
docs(readme): update deployment instructions
style(ui): improve mobile navigation layout
```

### Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: UI/styling changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🚀 Deployment

### Testing Deployment
Before submitting infrastructure changes:
1. Test with Azure Developer CLI locally
2. Verify all Azure resources deploy correctly
3. Check application functionality in container
4. Validate monitoring and logging

### Production Deployment
- All changes go through PR review
- CI/CD pipeline automatically deploys main branch
- Monitor deployment health and performance

## 🤝 Community Guidelines

### Be Educational
- Focus on clear, accurate content
- Consider diverse learning needs
- Provide helpful feedback
- Share knowledge and resources

### Be Respectful
- Use inclusive language
- Respect different perspectives
- Provide constructive feedback
- Help newcomers learn

### Be Collaborative
- Communicate openly about changes
- Ask questions when unclear
- Share knowledge and expertise
- Support the learning community

## 📞 Getting Help

- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the README and code comments
- **Code Review**: Request specific feedback in PRs

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for helping make robotics programming education more accessible and engaging! 🤖🎓
