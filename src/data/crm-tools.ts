export interface CRMTool {
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

export const crmTools: CRMTool[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'All-in-one CRM platform that combines marketing, sales, content management, and customer service tools.',
    logo: '/hubspot.png',
    website: 'https://www.hubspot.com',
    features: [
      'Contact management',
      'Deal tracking',
      'Marketing automation',
      'Email integration',
      'Analytics dashboard'
    ],
    pricing: {
      free: true,
      startingPrice: '$45/month',
      priceRange: '$45-$1200/month'
    },
    bestFor: [
      'Growing businesses',
      'Marketing teams',
      'Sales teams',
      'Customer service'
    ],
    pros: [
      'Robust free plan',
      'User-friendly interface',
      'Comprehensive features',
      'Great automation'
    ],
    cons: [
      'Expensive at scale',
      'Complex pricing',
      'Feature limitations in lower tiers'
    ]
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Enterprise-grade CRM platform with powerful customization and extensive third-party integrations.',
    logo: DEFAULT_LOGO,
    website: 'https://www.salesforce.com',
    features: [
      'Lead management',
      'Sales forecasting',
      'Process automation',
      'Custom reporting',
      'Mobile access'
    ],
    pricing: {
      free: false,
      startingPrice: '$25/user/month',
      priceRange: '$25-$300/user/month'
    },
    bestFor: [
      'Enterprise companies',
      'Large sales teams',
      'Complex workflows',
      'Custom solutions'
    ],
    pros: [
      'Highly customizable',
      'Powerful reporting',
      'Large app ecosystem',
      'Scalable solution'
    ],
    cons: [
      'Steep learning curve',
      'Expensive implementation',
      'Requires dedicated admin'
    ]
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Sales-focused CRM designed to visualize and optimize your sales pipeline with an intuitive interface.',
    logo: DEFAULT_LOGO,
    website: 'https://www.pipedrive.com',
    features: [
      'Visual pipeline',
      'Deal tracking',
      'Email integration',
      'Activity scheduler',
      'Mobile apps'
    ],
    pricing: {
      free: false,
      startingPrice: '$14.90/user/month',
      priceRange: '$14.90-$99/user/month'
    },
    bestFor: [
      'Small businesses',
      'Sales teams',
      'Real estate',
      'Consultancies'
    ],
    pros: [
      'Easy to use',
      'Visual sales process',
      'Good mobile apps',
      'Regular updates'
    ],
    cons: [
      'Limited customization',
      'Basic reporting',
      'No free plan'
    ]
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    description: 'Affordable CRM solution with AI-powered sales force automation and omnichannel communication.',
    logo: DEFAULT_LOGO,
    website: 'https://www.zoho.com/crm',
    features: [
      'Lead scoring',
      'Workflow automation',
      'Social media integration',
      'AI assistant',
      'Territory management'
    ],
    pricing: {
      free: true,
      startingPrice: '$14/user/month',
      priceRange: '$14-$52/user/month'
    },
    bestFor: [
      'Small businesses',
      'Startups',
      'Budget-conscious teams',
      'Remote teams'
    ],
    pros: [
      'Affordable pricing',
      'Good feature set',
      'AI capabilities',
      'Part of Zoho suite'
    ],
    cons: [
      'Interface can be cluttered',
      'Limited third-party integrations',
      'Support can be slow'
    ]
  },
  {
    id: 'freshsales',
    name: 'Freshsales',
    description: 'Modern CRM with built-in phone, email, and AI-powered contact scoring and deal insights.',
    logo: DEFAULT_LOGO,
    website: 'https://www.freshworks.com/freshsales-crm',
    features: [
      'Built-in phone/email',
      'AI-powered scoring',
      'Visual deal pipeline',
      'Time-saving automations',
      'Custom reports'
    ],
    pricing: {
      free: true,
      startingPrice: '$15/user/month',
      priceRange: '$15-$69/user/month'
    },
    bestFor: [
      'SMBs',
      'Inside sales teams',
      'B2B companies',
      'High-volume sales'
    ],
    pros: [
      'Clean interface',
      'Built-in communication',
      'AI features included',
      'Good value'
    ],
    cons: [
      'Limited customization',
      'Basic API',
      'Mobile app needs improvement'
    ]
  }
]; 