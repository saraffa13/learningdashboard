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
          difficulty: 'easy'
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
          difficulty: 'medium'
        },
        // Add more questions...
      ]
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
          difficulty: 'easy'
        },
       
      ]
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