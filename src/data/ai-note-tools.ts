export interface AINoteTools {
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

export const aiNoteTools: AINoteTools[] = [
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered workspace that enhances note-taking with smart writing assistance, summarization, and organization.',
    logo: '/notion.png',
    website: 'https://notion.so',
    features: [
      'AI writing assistance',
      'Smart summarization',
      'Content organization',
      'Collaboration tools',
      'Template generation'
    ],
    pricing: {
      free: true,
      startingPrice: '$10/month',
      priceRange: '$10-$20/month'
    },
    bestFor: [
      'Knowledge workers',
      'Writers',
      'Teams',
      'Project planning'
    ],
    pros: [
      'Powerful AI features',
      'Flexible workspace',
      'Great organization',
      'Rich formatting'
    ],
    cons: [
      'Learning curve',
      'Can be overwhelming',
      'AI features cost extra'
    ]
  },
  {
    id: 'mem',
    name: 'Mem.ai',
    description: 'AI-first note-taking app that automatically organizes your thoughts and creates connections between notes.',
    logo: DEFAULT_LOGO,
    website: 'https://mem.ai',
    features: [
      'AI organization',
      'Smart search',
      'Auto-tagging',
      'Knowledge graphs',
      'Quick capture'
    ],
    pricing: {
      free: true,
      startingPrice: '$8/month',
      priceRange: '$8-$20/month'
    },
    bestFor: [
      'Personal knowledge',
      'Researchers',
      'Students',
      'Thought organization'
    ],
    pros: [
      'Powerful AI search',
      'Natural writing flow',
      'Good mobile apps',
      'Timeline organization'
    ],
    cons: [
      'Limited formatting',
      'No offline mode',
      'Basic collaboration'
    ]
  },
  {
    id: 'reflect',
    name: 'Reflect',
    description: 'AI-powered note-taking app that helps you build a personal knowledge base with automatic connections.',
    logo: DEFAULT_LOGO,
    website: 'https://reflect.app',
    features: [
      'Bidirectional linking',
      'AI connections',
      'Daily notes',
      'Quick capture',
      'Mobile sync'
    ],
    pricing: {
      free: false,
      startingPrice: '$15/month',
      priceRange: '$15-$24/month'
    },
    bestFor: [
      'Personal notes',
      'Knowledge management',
      'Researchers',
      'Daily journaling'
    ],
    pros: [
      'Clean interface',
      'Smart connections',
      'Good for learning',
      'Fast performance'
    ],
    cons: [
      'No free plan',
      'Limited export options',
      'Basic sharing features'
    ]
  },
  {
    id: 'tana',
    name: 'Tana',
    description: 'AI-enhanced personal knowledge management system with structured data and smart organization.',
    logo: DEFAULT_LOGO,
    website: 'https://tana.inc',
    features: [
      'Structured notes',
      'AI assistance',
      'Smart templates',
      'Knowledge graphs',
      'Custom workflows'
    ],
    pricing: {
      free: false,
      startingPrice: '$8/month',
      priceRange: '$8-$20/month'
    },
    bestFor: [
      'Power users',
      'Knowledge workers',
      'Project management',
      'Research'
    ],
    pros: [
      'Powerful organization',
      'Flexible structure',
      'Good for complex data',
      'Regular updates'
    ],
    cons: [
      'Steep learning curve',
      'No free tier',
      'Complex setup'
    ]
  },
  {
    id: 'anytype',
    name: 'Anytype',
    description: 'Privacy-focused note-taking app with AI features and local-first storage approach.',
    logo: DEFAULT_LOGO,
    website: 'https://anytype.io',
    features: [
      'Local-first storage',
      'AI assistance',
      'Object-oriented',
      'Cross-platform',
      'End-to-end encryption'
    ],
    pricing: {
      free: true,
      startingPrice: '$0/month',
      priceRange: '$0-$15/month'
    },
    bestFor: [
      'Privacy focused',
      'Personal knowledge',
      'Offline use',
      'Data sovereignty'
    ],
    pros: [
      'Privacy focused',
      'Good free plan',
      'Works offline',
      'Open source'
    ],
    cons: [
      'Early stage product',
      'Limited integrations',
      'Basic AI features'
    ]
  }
]; 