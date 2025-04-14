export interface AIEmailTool {
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

export const aiEmailTools: AIEmailTool[] = [
  {
    id: 'superhuman',
    name: 'Superhuman',
    description: 'AI-powered email client that helps you achieve inbox zero with keyboard shortcuts and smart features.',
    logo: DEFAULT_LOGO,
    website: 'https://superhuman.com',
    features: [
      'AI triage',
      'Split inbox',
      'Keyboard shortcuts',
      'Follow-up reminders',
      'Undo send'
    ],
    pricing: {
      free: false,
      startingPrice: '$30/month',
      priceRange: '$30/month'
    },
    bestFor: [
      'Busy professionals',
      'Executives',
      'Power users',
      'Email power users'
    ],
    pros: [
      'Lightning fast',
      'Beautiful interface',
      'Smart features',
      'Great shortcuts'
    ],
    cons: [
      'Expensive',
      'No free plan',
      'Limited integrations'
    ]
  },
  {
    id: 'sanebox',
    name: 'SaneBox',
    description: 'AI email filtering service that automatically organizes your inbox and helps you focus on important emails.',
    logo: DEFAULT_LOGO,
    website: 'https://sanebox.com',
    features: [
      'Smart filtering',
      'Priority inbox',
      'Email tracking',
      'Attachment management',
      'Do Not Disturb'
    ],
    pricing: {
      free: false,
      startingPrice: '$7/month',
      priceRange: '$7-$36/month'
    },
    bestFor: [
      'Professionals',
      'Small teams',
      'High email volume',
      'Multiple accounts'
    ],
    pros: [
      'Works with any client',
      'Smart algorithms',
      'Good customization',
      'Reliable filtering'
    ],
    cons: [
      'Setup time needed',
      'Can be expensive',
      'Learning period'
    ]
  },
  {
    id: 'shortwave',
    name: 'Shortwave',
    description: 'Modern email client with AI-powered organization and smart features for Gmail users.',
    logo: DEFAULT_LOGO,
    website: 'https://shortwave.com',
    features: [
      'Smart bundling',
      'AI summaries',
      'Quick replies',
      'Thread organization',
      'Search filters'
    ],
    pricing: {
      free: true,
      startingPrice: '$9/month',
      priceRange: '$9-$25/month'
    },
    bestFor: [
      'Gmail users',
      'Teams',
      'Startups',
      'Heavy email users'
    ],
    pros: [
      'Modern interface',
      'Good free plan',
      'Smart organization',
      'Fast performance'
    ],
    cons: [
      'Gmail only',
      'Mobile app needs work',
      'Limited customization'
    ]
  },
  {
    id: 'emailtree',
    name: 'EmailTree AI',
    description: 'AI-powered email automation platform that helps teams handle customer emails efficiently.',
    logo: DEFAULT_LOGO,
    website: 'https://emailtree.ai',
    features: [
      'Auto-responses',
      'Email classification',
      'Intent detection',
      'Workflow automation',
      'Analytics'
    ],
    pricing: {
      free: false,
      startingPrice: '$29/user/month',
      priceRange: '$29-$99/user/month'
    },
    bestFor: [
      'Customer service',
      'Support teams',
      'Sales teams',
      'Large organizations'
    ],
    pros: [
      'Powerful automation',
      'Good accuracy',
      'Team collaboration',
      'Detailed analytics'
    ],
    cons: [
      'Complex setup',
      'Enterprise focus',
      'Steep learning curve'
    ]
  },
  {
    id: 'spark',
    name: 'Spark AI',
    description: 'Smart email client with AI features for personal and team email management.',
    logo: DEFAULT_LOGO,
    website: 'https://sparkmailapp.com',
    features: [
      'Smart inbox',
      'AI writing',
      'Team collaboration',
      'Smart notifications',
      'Email templates'
    ],
    pricing: {
      free: true,
      startingPrice: '$7.99/month',
      priceRange: '$7.99-$14.99/month'
    },
    bestFor: [
      'Professionals',
      'Small teams',
      'Multiple accounts',
      'Apple users'
    ],
    pros: [
      'Clean design',
      'Good collaboration',
      'Smart features',
      'Cross-platform'
    ],
    cons: [
      'Premium features cost',
      'Some sync issues',
      'Limited integrations'
    ]
  }
]; 