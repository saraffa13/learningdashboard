export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }
  
  export interface Assessment {
    id: string;
    title: string;
    description: string;
    category: string;
    timeLimit: number; 
    questions: Question[];
    totalPoints: number;
    passingScore: number;
    score:number;
    used:boolean;
  }
  
  export const mockAssessments: Assessment[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Test your knowledge of React basics and core concepts',
      category: 'Frontend Development',
      timeLimit: 30,
      totalPoints: 100,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is a React component?',
          options: [
            'A JavaScript function',
            'A reusable UI element',
            'A piece of HTML code',
            'All of the above'
          ],
          correctAnswer: 'All of the above',
          explanation: 'A React component is a reusable piece of UI that can be a JavaScript function or class that returns HTML (JSX).',
          category: 'Basics',
          difficulty: 'easy',
        },
        {
          id: 'q2',
          question: 'What is the purpose of useState hook?',
          options: [
            'To handle side effects',
            'To manage state in functional components',
            'To create custom hooks',
            'To handle routing'
          ],
          correctAnswer: 'To manage state in functional components',
          explanation: 'useState is a Hook that allows you to add state to functional components.',
          category: 'Hooks',
          difficulty: 'medium',
        },
        {
          id: 'q3',
          question: 'What is JSX?',
          options: [
            'A syntax extension for JavaScript',
            'A new programming language',
            'A CSS preprocessor',
            'A database query language'
          ],
          correctAnswer: 'A syntax extension for JavaScript',
          explanation: 'JSX is a syntax extension for JavaScript that looks similar to XML or HTML.',
          category: 'Basics',
          difficulty: 'easy',
        }
      ],
      used:false,
      score:0
    },
    {
      id: '2',
      title: 'TypeScript Basics',
      description: 'Evaluate your understanding of TypeScript fundamentals',
      category: 'Programming',
      timeLimit: 25,
      totalPoints: 100,
      passingScore: 65,
      questions: [
        {
          id: 'q1',
          question: 'What is the main purpose of TypeScript?',
          options: [
            'To replace JavaScript',
            'To add static typing to JavaScript',
            'To improve performance',
            'To reduce code size'
          ],
          correctAnswer: 'To add static typing to JavaScript',
          explanation: 'TypeScript adds optional static typing to JavaScript to help catch errors early and improve IDE support.',
          category: 'Basics',
          difficulty: 'easy',
        },
        {
          id: 'q2',
          question: 'Which of the following is a TypeScript feature?',
          options: [
            'Dynamic typing',
            'Static typing',
            'No typing',
            'Weak typing'
          ],
          correctAnswer: 'Static typing',
          explanation: 'TypeScript provides static typing, which helps in catching errors at compile time.',
          category: 'Features',
          difficulty: 'medium',
        }
      ],
      used:false,
      score:0
    },
    {
      id: '3',
      title: 'Advanced JavaScript',
      description: 'Challenge your understanding of advanced JavaScript concepts',
      category: 'Programming',
      timeLimit: 40,
      totalPoints: 100,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'What is a closure in JavaScript?',
          options: [
            'A function having access to its own scope',
            'A function having access to the parent scope',
            'A function having access to the global scope',
            'All of the above'
          ],
          correctAnswer: 'A function having access to the parent scope',
          explanation: 'A closure is a function that retains access to its parent scope, even after the parent function has closed.',
          category: 'Functions',
          difficulty: 'hard',
        },
        {
          id: 'q2',
          question: 'What is the purpose of the "this" keyword?',
          options: [
            'To refer to the current function',
            'To refer to the current object',
            'To refer to the global object',
            'To refer to the previous object'
          ],
          correctAnswer: 'To refer to the current object',
          explanation: 'The "this" keyword refers to the object from which the function was called.',
          category: 'Objects',
          difficulty: 'medium',
        }
      ],
      used:false,
      score:0
    }
  ];
  
  export interface AssessmentResult {
    id: string;
    assessmentId: string;
    userId: string;
    score: number;
    timeTaken: number;
    completedAt: string;
    answers: Record<string, string>;
    passed: boolean;
  }
  
  export const mockResults: AssessmentResult[] = [
    {
      id: 'result1',
      assessmentId: '1',
      userId: 'user1',
      score: 85,
      timeTaken: 25,
      completedAt: new Date().toISOString(),
      answers: {
        'q1': 'All of the above',
        'q2': 'To manage state in functional components'
      },
      passed: true
    }
  ];