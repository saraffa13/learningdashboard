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