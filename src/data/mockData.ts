export interface ContentItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    tags: string[];
  }
  
  export const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React, including components, props, and state.',
      category: 'Frontend Development',
      imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D',
      duration: '2 hours',
      level: 'Beginner',
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      id: '2',
      title: 'TypeScript Essentials',
      description: 'Master TypeScript fundamentals and type safety in your applications.',
      category: 'Programming',
      imageUrl: 'https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: '3 hours',
      level: 'Intermediate',
      tags: ['TypeScript', 'JavaScript', 'Programming']
    },
    {
      id: '3',
      title: 'Redux Toolkit Deep Dive',
      description: 'Advanced state management with Redux Toolkit and best practices.',
      category: 'State Management',
      imageUrl: 'https://shiftasia.com/community/content/images/2023/06/98c389e869de0e19208f256d51760e66--1-.png',
      duration: '4 hours',
      level: 'Advanced',
      tags: ['Redux', 'React', 'State Management']
    },
  ];
  
  export const categories = [
    'Frontend Development',
    'Backend Development',
    'Programming',
    'State Management',
    'Database',
    'DevOps'
  ];
  
  export const interests = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'DevOps',
    'Database',
    'Machine Learning'
  ];