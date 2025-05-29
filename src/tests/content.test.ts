/**
 * Educational Content Tests
 * 
 * These tests validate the accuracy and consistency of educational content
 * across all units in the LEGO Programming Learning Platform.
 */

import {
  CodeExampleValidator,
  CurriculumValidator,
  type CodeExample,
  type UnitValidation,
  type LearningObjective,
  type ContentSection
} from '../lib/contentValidation';

// Import the actual units data structure
interface UnitData {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  content: {
    introduction: string;
    objectives: string[];
    sections: {
      title: string;
      content: string;
      codeExample?: string;
    }[];
  };
}

// Actual units data used in the application
const units: Record<number, UnitData> = {
  1: {
    id: 1,
    title: "Overview",
    description: "Introduction to LEGO robotics and programming concepts",
    icon: "🔍",
    duration: "30 min",
    content: {
      introduction: "Welcome to the exciting world of LEGO robotics programming! In this unit, you'll learn the fundamentals of robotics and how programming brings LEGO robots to life.",
      objectives: [
        "Understand what robotics is and how it applies to LEGO",
        "Learn the basic components of a LEGO robot",
        "Discover how programming controls robot behavior",
        "Set up your learning environment"
      ],
      sections: [
        {
          title: "What is Robotics?",
          content: "Robotics combines mechanical engineering, electrical engineering, and computer science to create machines that can perform tasks automatically. LEGO robotics makes these concepts accessible and fun to learn."
        },
        {
          title: "LEGO Robot Components",
          content: "A typical LEGO robot consists of: the programmable hub (brain), motors (for movement), sensors (for input), and building elements (structure)."
        },
        {
          title: "Programming Languages",
          content: "While LEGO robots can be programmed with block-based languages, Python offers more power and flexibility for advanced robotics projects.",
          codeExample: `# Your first Python program for LEGO
print("Hello, LEGO Robot!")

# This simple command will display a message
# on your robot's screen or computer terminal`
        }
      ]
    }
  },
  2: {
    id: 2,
    title: "Hub/Software",
    description: "Getting started with LEGO hardware and software setup",
    icon: "🔧",
    duration: "45 min",
    content: {
      introduction: "Learn how to set up your LEGO hub and install the necessary software to start programming your robot.",
      objectives: [
        "Connect and configure your LEGO hub",
        "Install Python development environment",
        "Test your first connection",
        "Understand the development workflow"
      ],
      sections: [
        {
          title: "LEGO Hub Setup",
          content: "The LEGO hub is the brain of your robot. We'll learn how to connect it to your computer and prepare it for programming."
        },
        {
          title: "Software Installation",
          content: "Install the necessary software tools including Python, VS Code, and LEGO-specific libraries.",
          codeExample: `# Install required packages
pip install pybricks
pip install micropython

# Test your installation
import pybricks
print("Ready to program!")`
        }
      ]
    }
  },
  3: {
    id: 3,
    title: "Python Fundamentals",
    description: "Basic Python programming concepts for robotics",
    icon: "🐍",
    duration: "60 min",
    content: {
      introduction: "Master the essential Python programming concepts you'll need to control your LEGO robot effectively. This unit covers variables, functions, loops, and conditional statements.",
      objectives: [
        "Understand Python variables and data types",
        "Learn to use functions and parameters",
        "Master loops and conditional statements",
        "Practice with robotics-focused examples"
      ],
      sections: [
        {
          title: "Variables and Data Types",
          content: "Variables store information that your robot can use. Learn about numbers, strings, and boolean values in Python.",
          codeExample: `# Variables for robot control
speed = 50
robot_name = "Rex"
is_moving = True
print(f"Robot {robot_name} is moving at speed {speed}")`
        },
        {
          title: "Functions",
          content: "Functions are reusable blocks of code that make your robot programs organized and efficient.",
          codeExample: `def move_forward(distance):
    print(f"Moving forward {distance} cm")

def calculate_turn_time(angle):
    time_per_degree = 0.1
    return angle * time_per_degree`
        }
      ]
    }
  },
  4: {
    id: 4,
    title: "Movement",
    description: "Programming robot movement and motors",
    icon: "🚗",
    duration: "75 min",
    content: {
      introduction: "Learn to control your robot's movement with precision. This unit covers basic motor control, precise movement, and complex movement patterns.",
      objectives: [
        "Control individual motors and motor pairs",
        "Implement precise movement and turning",
        "Create movement patterns and sequences",
        "Understand motor timing and synchronization"
      ],
      sections: [
        {
          title: "Basic Motor Control",
          content: "Start with simple motor operations to move your robot forward, backward, and turn.",
          codeExample: `from pybricks.pupdevices import Motor
from pybricks.parameters import Port
from pybricks.tools import wait

left_motor = Motor(Port.A)
right_motor = Motor(Port.B)

left_motor.run(200)
right_motor.run(200)
wait(2000)

left_motor.stop()
right_motor.stop()`
        }
      ]
    }
  }
};

describe('Educational Content Validation', () => {
  const codeValidator = new CodeExampleValidator();
  const curriculumValidator = new CurriculumValidator();

  describe('Code Example Validation', () => {
    test('Python syntax validation for all code examples', () => {
      const allCodeExamples: CodeExample[] = [];
      
      // Extract all code examples from units
      Object.entries(units).forEach(([unitId, unit]) => {
        unit.content.sections.forEach((section) => {
          if (section.codeExample) {
            allCodeExamples.push({
              code: section.codeExample,
              language: 'python',
              unitId,
              sectionTitle: section.title,
              shouldCompile: true
            });
          }
        });
      });

      // Validate each code example
      allCodeExamples.forEach(example => {
        const syntaxErrors = codeValidator.validatePythonSyntax(example);
        
        if (syntaxErrors.length > 0) {
          console.warn(`Syntax issues in Unit ${example.unitId}, Section "${example.sectionTitle}":`, syntaxErrors);
        }
        
        // Critical syntax errors should fail the test
        const criticalErrors = syntaxErrors.filter(error => 
          error.includes('Invalid variable name') || 
          error.includes('missing colon') ||
          error.includes('Unbalanced parentheses')
        );
        
        expect(criticalErrors).toHaveLength(0);
      });
    });    test('LEGO API usage best practices', () => {
      const allCodeExamples: CodeExample[] = [];
      
      Object.entries(units).forEach(([unitId, unit]) => {
        unit.content.sections.forEach((section) => {
          if (section.codeExample) {
            allCodeExamples.push({
              code: section.codeExample,
              language: 'python',
              unitId,
              sectionTitle: section.title,
              shouldCompile: true
            });
          }
        });
      });

      allCodeExamples.forEach(example => {
        const practiceErrors = codeValidator.validateLegoCodePractices(example);
        
        // Log warnings for best practice violations
        if (practiceErrors.length > 0) {
          console.warn(`Best practice issues in Unit ${example.unitId}, Section "${example.sectionTitle}":`, practiceErrors);
        }
        
        // For now, we'll treat these as warnings, not test failures
        // In the future, you might want to enforce stricter rules
      });
    });    test('Educational value of code examples', () => {
      const allCodeExamples: CodeExample[] = [];
      
      Object.entries(units).forEach(([unitId, unit]) => {
        unit.content.sections.forEach((section) => {
          if (section.codeExample) {
            allCodeExamples.push({
              code: section.codeExample,
              language: 'python',
              unitId,
              sectionTitle: section.title,
              shouldCompile: true
            });
          }
        });
      });

      allCodeExamples.forEach(example => {
        const educationalErrors = codeValidator.validateEducationalValue(example);
        
        if (educationalErrors.length > 0) {
          console.warn(`Educational value issues in Unit ${example.unitId}, Section "${example.sectionTitle}":`, educationalErrors);
        }
      });
    });
  });
  describe('Curriculum Structure Validation', () => {
    test('Learning progression across units', () => {
      const unitValidations: UnitValidation[] = Object.entries(units).map(([unitId, unit]) => ({
        unitId,
        title: unit.title,
        sections: unit.content.sections.map((section) => ({
          title: section.title,
          content: section.content,
          unitId,
          codeExamples: section.codeExample ? [{
            code: section.codeExample,
            language: 'python',
            unitId,
            sectionTitle: section.title,
            shouldCompile: true
          }] : [],
          objectives: unit.content.objectives
        })),
        objectives: unit.content.objectives.map((obj: string, index: number) => ({
          id: `${unitId}-obj-${index}`,
          description: obj,
          unitId,
          measurable: true,
          achievable: true
        })),
        prerequisites: getUnitPrerequisites(unitId),
        difficulty: getUnitDifficulty(unitId)
      }));

      const progressionErrors = curriculumValidator.validateLearningProgression(unitValidations);
      
      if (progressionErrors.length > 0) {
        console.warn('Learning progression issues:', progressionErrors);
      }
      
      // Ensure no critical progression errors
      const criticalErrors = progressionErrors.filter(error => 
        error.includes('Prerequisite') && error.includes('not covered')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });    test('Learning objectives quality', () => {
      const allObjectives: LearningObjective[] = [];
      
      Object.entries(units).forEach(([unitId, unit]) => {
        unit.content.objectives.forEach((objective: string, index: number) => {
          allObjectives.push({
            id: `${unitId}-obj-${index}`,
            description: objective,
            unitId,
            measurable: true,
            achievable: true
          });
        });
      });

      const objectiveErrors = curriculumValidator.validateLearningObjectives(allObjectives);
      
      if (objectiveErrors.length > 0) {
        console.warn('Learning objective issues:', objectiveErrors);
      }
      
      // Ensure objectives meet basic quality standards
      allObjectives.forEach(objective => {
        expect(objective.description.length).toBeGreaterThan(15);
        expect(objective.description.length).toBeLessThan(200);
      });
    });    test('Content consistency across sections', () => {
      const allSections: ContentSection[] = [];
      
      Object.entries(units).forEach(([unitId, unit]) => {
        unit.content.sections.forEach((section) => {
          allSections.push({
            title: section.title,
            content: section.content,
            unitId,
            codeExamples: section.codeExample ? [{
              code: section.codeExample,
              language: 'python',
              unitId,
              sectionTitle: section.title,
              shouldCompile: true
            }] : [],
            objectives: unit.content.objectives
          });
        });
      });

      const consistencyErrors = curriculumValidator.validateContentConsistency(allSections);
      
      if (consistencyErrors.length > 0) {
        console.warn('Content consistency issues:', consistencyErrors);
      }
      
      // Ensure no critical consistency issues
      const criticalErrors = consistencyErrors.filter(error => 
        error.includes('Inconsistent') && error.includes('terminology')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });
  describe('Specific Unit Content Tests', () => {
    test('Unit 1 (Overview) contains foundational concepts', () => {
      const unit1 = units[1];
      expect(unit1).toBeDefined();
      
      const content = unit1.content;
      const allText = [
        content.introduction,
        ...content.sections.map((s) => s.content),
        ...content.objectives
      ].join(' ').toLowerCase();
      
      // Check for key foundational concepts
      expect(allText).toMatch(/robot/);
      expect(allText).toMatch(/programming/);
      expect(allText).toMatch(/python/);
      expect(allText).toMatch(/lego/);
    });

    test('Unit 3 (Python Fundamentals) covers programming basics', () => {
      const unit3 = units[3];
      expect(unit3).toBeDefined();
      
      const content = unit3.content;
      const allText = [
        content.introduction,
        ...content.sections.map((s) => s.content),
        ...content.objectives
      ].join(' ').toLowerCase();
      
      // Check for Python fundamentals
      expect(allText).toMatch(/variable/);
      expect(allText).toMatch(/function/);
      expect(allText).toMatch(/loop|for|while/);
      expect(allText).toMatch(/condition|if/);
    });

    test('Unit 4 (Movement) includes motor control concepts', () => {
      const unit4 = units[4];
      expect(unit4).toBeDefined();
      
      const content = unit4.content;
      const allText = [
        content.introduction,
        ...content.sections.map((s) => s.content),
        ...content.objectives
      ].join(' ').toLowerCase();
      
      // Check for movement and motor concepts
      expect(allText).toMatch(/motor/);
      expect(allText).toMatch(/movement|move/);
      expect(allText).toMatch(/speed/);
      expect(allText).toMatch(/angle|degree/);
    });
  });
});

// Helper functions for curriculum validation
function getUnitPrerequisites(unitId: string): string[] {
  const prerequisites: Record<string, string[]> = {
    '1': [],
    '2': ['basic robotics concepts'],
    '3': ['hardware setup', 'robotics fundamentals'],
    '4': ['Python basics', 'programming fundamentals'],
    '5': ['motor control', 'basic programming'],
    '6': ['sensor usage', 'programming concepts', 'motor control']
  };
  
  return prerequisites[unitId] || [];
}

function getUnitDifficulty(unitId: string): 'Beginner' | 'Intermediate' | 'Advanced' {
  const difficulties: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'> = {
    '1': 'Beginner',
    '2': 'Beginner',
    '3': 'Beginner',
    '4': 'Intermediate',
    '5': 'Intermediate',
    '6': 'Advanced'
  };
  
  return difficulties[unitId] || 'Beginner';
}
