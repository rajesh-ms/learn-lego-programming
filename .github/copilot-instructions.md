# Copilot Instructions for LEGO Programming Learning Platform

## Project Overview
This is a Next.js-based learning website for teaching LEGO robotics programming in Python. The platform provides interactive lessons, code examples, and educational content based on the curriculum from PrimeLessons.org.

## Technical Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Target Audience**: Students learning LEGO robotics programming with Python

## Curriculum Structure
The platform covers 6 main units:
1. **Overview**: Introduction to LEGO robotics and programming concepts
2. **Hub/Software**: Getting started with LEGO hardware and software setup
3. **Python Fundamentals**: Basic Python programming concepts
4. **Movement**: Programming robot movement and motors
5. **Sensors/Outputs**: Working with sensors and output devices
6. **Advanced Programming**: Complex topics like PID controllers and line followers

## Code Guidelines
- Use TypeScript for all components and utilities
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with a modern, educational design
- Create reusable components for lessons, code examples, and interactive elements
- Implement responsive design for mobile and desktop learning
- Include syntax highlighting for Python code examples
- Use semantic HTML for accessibility

## Component Structure
- `components/ui/`: Reusable UI components (buttons, cards, navigation)
- `components/lesson/`: Lesson-specific components (code blocks, interactive demos)
- `app/units/`: Individual unit pages and content
- `lib/`: Utility functions and data structures
- `types/`: TypeScript type definitions

## Educational Features
- Interactive code examples with syntax highlighting
- Step-by-step lesson progression
- Code playground for testing concepts
- Visual diagrams and illustrations
- Progress tracking
- Mobile-friendly responsive design

## Accessibility
- Use proper heading hierarchy (h1, h2, h3)
- Include alt text for images
- Ensure keyboard navigation
- Maintain good color contrast ratios
- Use semantic HTML elements

## Performance
- Optimize images and assets
- Use Next.js built-in optimization features
- Implement code splitting for large lesson content
- Lazy load non-critical components
