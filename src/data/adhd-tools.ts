export interface ADHDTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  features: string[];
  pricing: {
    free?: boolean;
    startingPrice?: string;
    priceRange: string;
  };
  bestFor: string[];
  pros: string[];
  cons: string[];
}

const DEFAULT_LOGO = '/globe.svg';

export const adhdTools: ADHDTool[] = [
  {
    id: 'focusmate',
    name: 'Focusmate',
    description: 'Virtual coworking platform that pairs you with accountability partners for focused work sessions.',
    logo: DEFAULT_LOGO,
    website: 'https://www.focusmate.com',
    features: [
      'Scheduled work sessions',
      'Accountability partners',
      'Progress tracking',
      'Calendar integration',
      'Community support'
    ],
    pricing: {
      free: true,
      startingPrice: '$5/month',
      priceRange: '$5-$10/month'
    },
    bestFor: [
      'Remote workers',
      'Students',
      'ADHD individuals',
      'Freelancers'
    ],
    pros: [
      'Human accountability',
      'Structured sessions',
      'Reduces procrastination',
      'Supportive community'
    ],
    cons: [
      'Requires scheduling',
      'Limited free sessions',
      'Dependent on partners'
    ]
  },
  {
    id: 'freedom',
    name: 'Freedom',
    description: 'Distraction blocker that helps you focus by blocking apps, websites, and notifications across all devices.',
    logo: DEFAULT_LOGO,
    website: 'https://freedom.to',
    features: [
      'Cross-device blocking',
      'Scheduled sessions',
      'Custom blocklists',
      'Locked mode',
      'Focus sounds'
    ],
    pricing: {
      free: false,
      startingPrice: '$8.99/month',
      priceRange: '$8.99-$129.99/year'
    },
    bestFor: [
      'Digital workers',
      'Writers',
      'Students',
      'Focus seekers'
    ],
    pros: [
      'Powerful blocking',
      'Works across devices',
      'Customizable',
      'Can\'t be bypassed'
    ],
    cons: [
      'No free plan',
      'Can be restrictive',
      'Setup required'
    ]
  },
  {
    id: 'todoist',
    name: 'Todoist',
    description: 'Task manager with natural language input and smart scheduling perfect for ADHD-friendly organization.',
    logo: DEFAULT_LOGO,
    website: 'https://todoist.com',
    features: [
      'Natural language input',
      'Priority levels',
      'Smart scheduling',
      'Recurring tasks',
      'Visual organization'
    ],
    pricing: {
      free: true,
      startingPrice: '$4/month',
      priceRange: '$4-$8/month'
    },
    bestFor: [
      'Task management',
      'Personal organization',
      'Project planning',
      'Daily routines'
    ],
    pros: [
      'Easy input',
      'Clean interface',
      'Good free plan',
      'Cross-platform'
    ],
    cons: [
      'Limited free features',
      'Can get overwhelming',
      'Basic calendar view'
    ]
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Gamified focus app that helps you stay present by planting virtual trees that grow while you focus.',
    logo: DEFAULT_LOGO,
    website: 'https://www.forestapp.cc',
    features: [
      'Gamified focus timer',
      'Real tree planting',
      'Friend system',
      'Statistics tracking',
      'White noise'
    ],
    pricing: {
      free: true,
      startingPrice: '$2/month',
      priceRange: '$2/month'
    },
    bestFor: [
      'Short focus sessions',
      'Phone addiction',
      'Students',
      'Visual learners'
    ],
    pros: [
      'Fun and engaging',
      'Environmental impact',
      'Affordable',
      'Visual motivation'
    ],
    cons: [
      'Basic features',
      'Limited customization',
      'Mobile-focused'
    ]
  },
  {
    id: 'braintoss',
    name: 'BrainToss',
    description: 'Quick capture tool that helps you instantly save thoughts, ideas, and tasks to your preferred system.',
    logo: DEFAULT_LOGO,
    website: 'https://braintoss.com',
    features: [
      'Voice notes',
      'Image capture',
      'Text notes',
      'Multiple outputs',
      'Quick capture'
    ],
    pricing: {
      free: false,
      startingPrice: '$3.99',
      priceRange: '$3.99 one-time'
    },
    bestFor: [
      'Quick capture',
      'Idea management',
      'Task collection',
      'Note taking'
    ],
    pros: [
      'Fast capture',
      'Multiple formats',
      'Simple interface',
      'One-time payment'
    ],
    cons: [
      'Limited features',
      'Basic organization',
      'No free version'
    ]
  }
]; 