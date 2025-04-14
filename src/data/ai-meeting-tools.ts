export interface AIMeetingTool {
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

export const aiMeetingTools: AIMeetingTool[] = [
  {
    id: 'otter',
    name: 'Otter.ai',
    description: 'AI-powered meeting assistant that provides real-time transcription, automated notes, and meeting summaries.',
    logo: DEFAULT_LOGO,
    website: 'https://otter.ai',
    features: [
      'Real-time transcription',
      'Automated meeting notes',
      'AI meeting summary',
      'Speaker identification',
      'Meeting analytics'
    ],
    pricing: {
      free: true,
      startingPrice: '$10/month',
      priceRange: '$10-$30/month'
    },
    bestFor: [
      'Remote teams',
      'Journalists',
      'Students',
      'Business professionals'
    ],
    pros: [
      'Accurate transcription',
      'Easy to use',
      'Good free plan',
      'Cross-platform support'
    ],
    cons: [
      'Limited storage in free plan',
      'Some features need Pro plan',
      'Language limitations'
    ]
  },
  {
    id: 'fireflies',
    name: 'Fireflies.ai',
    description: 'AI meeting assistant that automatically records, transcribes, and analyzes your conversations.',
    logo: DEFAULT_LOGO,
    website: 'https://fireflies.ai',
    features: [
      'Automated transcription',
      'Meeting search',
      'Conversation AI',
      'Team collaboration',
      'Integration hub'
    ],
    pricing: {
      free: true,
      startingPrice: '$10/month',
      priceRange: '$10-$19/month'
    },
    bestFor: [
      'Sales teams',
      'Customer success',
      'Recruiters',
      'Team managers'
    ],
    pros: [
      'Advanced search capabilities',
      'Good integration options',
      'Team collaboration features',
      'Custom vocabulary'
    ],
    cons: [
      'Learning curve',
      'Premium features costly',
      'Internet dependency'
    ]
  },
  {
    id: 'fathom',
    name: 'Fathom',
    description: 'AI notetaker that automatically captures, summarizes, and organizes your meetings.',
    logo: DEFAULT_LOGO,
    website: 'https://fathom.video',
    features: [
      'Automated notes',
      'Real-time highlights',
      'Action item tracking',
      'Meeting summaries',
      'Video recordings'
    ],
    pricing: {
      free: false,
      startingPrice: '$15/month',
      priceRange: '$15-$30/month'
    },
    bestFor: [
      'Executives',
      'Product managers',
      'Team leaders',
      'Consultants'
    ],
    pros: [
      'High-quality summaries',
      'Action item extraction',
      'Clean interface',
      'Privacy focus'
    ],
    cons: [
      'No free plan',
      'Limited integrations',
      'Higher price point'
    ]
  },
  {
    id: 'vowel',
    name: 'Vowel',
    description: 'All-in-one meeting platform with built-in AI for transcription, notes, and analytics.',
    logo: DEFAULT_LOGO,
    website: 'https://vowel.com',
    features: [
      'Meeting hosting',
      'AI transcription',
      'Meeting insights',
      'Collaborative notes',
      'Meeting library'
    ],
    pricing: {
      free: true,
      startingPrice: '$12/month',
      priceRange: '$12-$20/month'
    },
    bestFor: [
      'Distributed teams',
      'Project managers',
      'Agile teams',
      'Remote companies'
    ],
    pros: [
      'All-in-one solution',
      'Good meeting organization',
      'Team collaboration',
      'Meeting analytics'
    ],
    cons: [
      'New platform',
      'Limited third-party integrations',
      'Requires app installation'
    ]
  },
  {
    id: 'sembly',
    name: 'Sembly AI',
    description: 'Smart meeting assistant that captures, transcribes, and generates actionable insights from meetings.',
    logo: DEFAULT_LOGO,
    website: 'https://sembly.ai',
    features: [
      'Smart summaries',
      'Action items detection',
      'Meeting transcription',
      'Topic extraction',
      'Meeting analytics'
    ],
    pricing: {
      free: true,
      startingPrice: '$8/month',
      priceRange: '$8-$25/month'
    },
    bestFor: [
      'Business teams',
      'Project managers',
      'Remote workers',
      'Consultants'
    ],
    pros: [
      'Affordable pricing',
      'Good accuracy',
      'Easy to use',
      'Multiple language support'
    ],
    cons: [
      'Limited free plan',
      'Mobile app needs improvement',
      'Basic search functionality'
    ]
  }
]; 