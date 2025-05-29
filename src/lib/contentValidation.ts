/**
 * Educational Content Testing Framework
 * 
 * This module provides utilities for testing:
 * - Code example syntax and execution
 * - Educational content consistency
 * - Curriculum validation
 * - Learning objectives alignment
 */

export interface CodeExample {
  code: string;
  language: string;
  unitId: string;
  sectionTitle: string;
  expectedOutput?: string;
  shouldCompile: boolean;
}

export interface LearningObjective {
  id: string;
  description: string;
  unitId: string;
  measurable: boolean;
  achievable: boolean;
}

export interface ContentSection {
  title: string;
  content: string;
  unitId: string;
  codeExamples: CodeExample[];
  objectives: string[];
}

export interface UnitValidation {
  unitId: string;
  title: string;
  sections: ContentSection[];
  objectives: LearningObjective[];
  prerequisites: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export class ContentValidationError extends Error {
  constructor(
    message: string,
    public readonly unitId?: string,
    public readonly sectionTitle?: string,
    public readonly codeExample?: string
  ) {
    super(message);
    this.name = 'ContentValidationError';
  }
}

export class CodeExampleValidator {
  private pythonKeywords = [
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
    'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import',
    'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return',
    'try', 'while', 'with', 'yield'
  ];

  private legoApiMethods = [
    'motor.run_angle', 'motor.run_time', 'motor.run_to_position', 'motor.stop',
    'sensor.distance', 'sensor.color', 'sensor.force', 'sensor.reflection',
    'hub.light.on', 'hub.light.off', 'hub.speaker.beep', 'wait'
  ];
  /**
   * Validates Python syntax for LEGO robotics code
   */
  validatePythonSyntax(codeExample: CodeExample): string[] {
    const errors: string[] = [];
    const { code } = codeExample;

    // Basic syntax checks
    const lines = code.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineNumber = i + 1;

      if (!line || line.startsWith('#')) continue;

      // Check indentation consistency
      const leadingSpaces = lines[i].match(/^(\s*)/)?.[1].length || 0;
      if (leadingSpaces % 4 !== 0) {
        errors.push(`Line ${lineNumber}: Inconsistent indentation (should be multiples of 4 spaces)`);
      }

      // Check for basic Python syntax patterns
      if (line.includes('=') && !line.includes('==') && !line.includes('!=')) {
        const parts = line.split('=');
        if (parts.length >= 2) {
          const variable = parts[0].trim();
          if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(variable) && !variable.includes('.')) {
            errors.push(`Line ${lineNumber}: Invalid variable name '${variable}'`);
          }
        }
      }

      // Check function definitions
      if (line.startsWith('def ')) {
        if (!line.endsWith(':')) {
          errors.push(`Line ${lineNumber}: Function definition missing colon`);
        }
      }

      // Check class definitions
      if (line.startsWith('class ')) {
        if (!line.endsWith(':')) {
          errors.push(`Line ${lineNumber}: Class definition missing colon`);
        }
      }

      // Check for common LEGO API usage
      if (line.includes('motor.') || line.includes('sensor.') || line.includes('hub.')) {
        const hasValidApi = this.legoApiMethods.some(method => line.includes(method));
        if (!hasValidApi && !line.includes('=')) {
          errors.push(`Line ${lineNumber}: Potentially invalid LEGO API call`);
        }
      }

      // Check for balanced parentheses
      const openParens = (line.match(/\(/g) || []).length;
      const closeParens = (line.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        errors.push(`Line ${lineNumber}: Unbalanced parentheses`);
      }
    }

    return errors;
  }

  /**
   * Validates that code examples follow LEGO robotics best practices
   */
  validateLegoCodePractices(codeExample: CodeExample): string[] {
    const errors: string[] = [];
    const { code } = codeExample;

    // Check for proper motor usage
    if (code.includes('motor.run_angle') && !code.includes('speed')) {
      errors.push('Motor commands should specify speed parameter');
    }

    // Check for sensor value validation
    if (code.includes('sensor.distance()') && !code.includes('if') && !code.includes('while')) {
      errors.push('Sensor readings should include conditional logic or validation');
    }

    // Check for proper wait statements
    if (code.includes('motor.run_') && !code.includes('wait(')) {
      errors.push('Motor operations should include appropriate wait statements');
    }

    // Check for magic numbers
    const numbers = code.match(/\b\d{3,}\b/g);
    if (numbers && numbers.length > 0) {
      errors.push('Consider using named constants instead of magic numbers');
    }

    // Check for proper error handling in advanced examples
    if (code.length > 200 && !code.includes('try') && !code.includes('except')) {
      errors.push('Complex code examples should include error handling');
    }

    return errors;
  }

  /**
   * Validates code example completeness and educational value
   */
  validateEducationalValue(codeExample: CodeExample): string[] {
    const errors: string[] = [];
    const { code, unitId } = codeExample;

    // Check for comments explaining key concepts
    const commentLines = (code.match(/#.*/g) || []).length;
    const totalLines = code.split('\n').filter(line => line.trim()).length;
    
    if (totalLines > 5 && commentLines === 0) {
      errors.push('Code examples should include explanatory comments');
    }

    // Check for progressive complexity based on unit
    const unitNumber = parseInt(unitId);
    if (unitNumber <= 2 && code.includes('class ')) {
      errors.push('Early units should focus on basic concepts before introducing classes');
    }

    if (unitNumber >= 5 && !code.includes('def ') && code.length > 100) {
      errors.push('Advanced units should demonstrate function usage');
    }

    // Check for appropriate complexity
    const complexityIndicators = [
      code.includes('for '),
      code.includes('while '),
      code.includes('if '),
      code.includes('def '),
      code.includes('class ')
    ].filter(Boolean).length;

    if (unitNumber <= 3 && complexityIndicators > 2) {
      errors.push('Code complexity may be too high for this unit level');
    }

    return errors;
  }
}

export class CurriculumValidator {
  /**
   * Validates learning progression across units
   */
  validateLearningProgression(units: UnitValidation[]): string[] {
    const errors: string[] = [];
    
    // Sort units by ID
    const sortedUnits = units.sort((a, b) => parseInt(a.unitId) - parseInt(b.unitId));

    // Check prerequisite flow
    for (let i = 1; i < sortedUnits.length; i++) {
      const currentUnit = sortedUnits[i];
      const previousUnits = sortedUnits.slice(0, i);
      
      for (const prerequisite of currentUnit.prerequisites) {
        const hasPrerequisite = previousUnits.some(unit => 
          unit.objectives.some(obj => obj.description.toLowerCase().includes(prerequisite.toLowerCase()))
        );
        
        if (!hasPrerequisite) {
          errors.push(`Unit ${currentUnit.unitId}: Prerequisite '${prerequisite}' not covered in previous units`);
        }
      }
    }

    // Check difficulty progression
    const difficultyLevels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    for (let i = 1; i < sortedUnits.length; i++) {
      const currentDifficulty = difficultyLevels[sortedUnits[i].difficulty];
      const previousDifficulty = difficultyLevels[sortedUnits[i - 1].difficulty];
      
      if (currentDifficulty < previousDifficulty) {
        errors.push(`Unit ${sortedUnits[i].unitId}: Difficulty regression from previous unit`);
      }
    }

    return errors;
  }

  /**
   * Validates learning objectives are measurable and achievable
   */
  validateLearningObjectives(objectives: LearningObjective[]): string[] {
    const errors: string[] = [];
    
    const measurableVerbs = [
      'identify', 'explain', 'demonstrate', 'create', 'implement', 'analyze',
      'design', 'build', 'program', 'debug', 'test', 'modify', 'compare'
    ];

    for (const objective of objectives) {
      const { description, id, unitId } = objective;
      
      // Check for measurable verbs
      const hasMeasurableVerb = measurableVerbs.some(verb => 
        description.toLowerCase().includes(verb)
      );
      
      if (!hasMeasurableVerb) {
        errors.push(`Objective ${id} in Unit ${unitId}: Should use measurable action verbs`);
      }

      // Check length and clarity
      if (description.length < 20) {
        errors.push(`Objective ${id} in Unit ${unitId}: Description too brief`);
      }

      if (description.length > 150) {
        errors.push(`Objective ${id} in Unit ${unitId}: Description too verbose`);
      }

      // Check for LEGO-specific content
      const legoTerms = ['motor', 'sensor', 'hub', 'robot', 'programming', 'python'];
      const hasLegoContent = legoTerms.some(term => 
        description.toLowerCase().includes(term)
      );
      
      if (!hasLegoContent) {
        errors.push(`Objective ${id} in Unit ${unitId}: Should include LEGO robotics terminology`);
      }
    }

    return errors;
  }
  /**
   * Validates content consistency across sections
   */
  validateContentConsistency(sections: ContentSection[]): string[] {
    const errors: string[] = [];
    
    sections.forEach(section => {
      const content = section.content.toLowerCase();
      
      // Track terminology usage
      if (content.includes('motor') && content.includes('engine')) {
        errors.push(`Section '${section.title}': Inconsistent motor/engine terminology`);
      }

      if (content.includes('sensor') && content.includes('detector')) {
        errors.push(`Section '${section.title}': Inconsistent sensor/detector terminology`);
      }

      // Check for appropriate section length
      if (section.content.length < 100) {
        errors.push(`Section '${section.title}': Content too brief for educational value`);
      }

      if (section.content.length > 2000) {
        errors.push(`Section '${section.title}': Content may be too lengthy for engagement`);
      }
    });

    return errors;
  }
}
