export interface AIPlanningTool {
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

export const aiPlanningTools: AIPlanningTool[] = [
  {
    id: 'motion',
    name: 'Motion',
    description: 'AI-powered daily planner that automatically schedules your tasks and adapts to changes in real-time.',
    logo: DEFAULT_LOGO,
    website: 'https://www.usemotion.com',
    features: [
      'AI task scheduling',
      'Calendar integration',
      'Smart prioritization',
      'Team collaboration',
      'Automated planning'
    ],
    pricing: {
      free: false,
      startingPrice: '$19/month',
      priceRange: '$19-$34/month'
    },
    bestFor: [
      'Busy professionals',
      'Remote teams',
      'Freelancers',
      'Project managers'
    ],
    pros: [
      'Intelligent task scheduling',
      'Seamless calendar integration',
      'Real-time adaptability',
      'Clean interface'
    ],
    cons: [
      'No free plan',
      'Learning curve for AI features',
      'Limited customization options'
    ]
  },
  {
    id: 'reclaim',
    name: 'Reclaim.ai',
    description: 'Smart calendar assistant that automatically schedules your tasks, habits, and breaks.',
    logo: DEFAULT_LOGO,
    website: 'https://reclaim.ai',
    features: [
      'Smart scheduling',
      'Habit tracking',
      'Buffer time management',
      'Meeting scheduling',
      'Calendar analytics'
    ],
    pricing: {
      free: true,
      startingPrice: '$8/month',
      priceRange: '$8-$16/month'
    },
    bestFor: [
      'Knowledge workers',
      'Team leaders',
      'Busy professionals',
      'Remote workers'
    ],
    pros: [
      'Excellent calendar management',
      'Smart habit scheduling',
      'Good free plan',
      'Work-life balance focus'
    ],
    cons: [
      'Requires calendar access',
      'Can be too automated',
      'Limited integrations'
    ]
  },
  {
    id: 'sunsama',
    name: 'Sunsama',
    description: 'Daily planner that combines task management with calendar to create mindful daily planning.',
    logo: DEFAULT_LOGO,
    website: 'https://sunsama.com',
    features: [
      'Daily planning ritual',
      'Task prioritization',
      'Time tracking',
      'Calendar integration',
      'Cross-platform sync'
    ],
    pricing: {
      free: true,
      startingPrice: '$16/month',
      priceRange: '$16-$20/month'
    },
    bestFor: [
      'Knowledge workers',
      'Mindful planners',
      'Professionals',
      'Small teams'
    ],
    pros: [
      'Mindful planning approach',
      'Beautiful interface',
      'Good task management',
      'Calendar integration'
    ],
    cons: [
      'Higher price point',
      'Limited team features',
      'Learning curve'
    ]
  },
  {
    id: 'todoist',
    name: 'Todoist AI',
    description: 'Popular task manager enhanced with AI capabilities for smart task organization and natural language input.',
    logo: DEFAULT_LOGO,
    website: 'https://todoist.com',
    features: [
      'Natural language input',
      'AI task organization',
      'Smart scheduling',
      'Project templates',
      'Cross-platform sync'
    ],
    pricing: {
      free: true,
      startingPrice: '$4/month',
      priceRange: '$4-$8/month'
    },
    bestFor: [
      'Individual users',
      'Small teams',
      'Personal productivity',
      'Project organization'
    ],
    pros: [
      'Intuitive interface',
      'Affordable pricing',
      'Rich feature set',
      'Great mobile apps'
    ],
    cons: [
      'Limited AI features in free plan',
      'Basic reporting',
      'Simple calendar view'
    ]
  },
  {
    id: 'akiflow',
    name: 'Akiflow',
    description: 'AI-powered personal command center that consolidates tasks, calendar, and notes in one place.',
    logo: DEFAULT_LOGO,
    website: 'https://akiflow.com',
    features: [
      'Universal inbox',
      'AI task processing',
      'Command bar',
      'Time blocking',
      'Integration hub'
    ],
    pricing: {
      free: false,
      startingPrice: '$15/month',
      priceRange: '$15-$25/month'
    },
    bestFor: [
      'Power users',
      'Productivity enthusiasts',
      'Knowledge workers',
      'Busy professionals'
    ],
    pros: [
      'Powerful command bar',
      'Great integrations',
      'Keyboard-first workflow',
      'Smart task processing'
    ],
    cons: [
      'No free plan',
      'Steep learning curve',
      'Desktop-focused'
    ]
  }
]; 