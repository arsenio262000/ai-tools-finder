export interface ProjectManagementTool {
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

export const projectManagementTools: ProjectManagementTool[] = [
  {
    id: 'monday',
    name: 'Monday.com',
    description: 'A flexible project management platform that adapts to any workflow with powerful automation and integrations.',
    logo: '/logos/monday.png',
    website: 'https://monday.com',
    features: [
      'Custom workflows and automations',
      'Multiple view options (Kanban, Gantt, Calendar)',
      'Time tracking',
      'Resource management',
      'Integration with 40+ tools'
    ],
    pricing: {
      free: true,
      startingPrice: '$8/user/month',
      priceRange: '$8-$16/user/month'
    },
    bestFor: [
      'Mid-sized teams',
      'Marketing teams',
      'Software development',
      'Project management'
    ],
    pros: [
      'Highly customizable',
      'Intuitive interface',
      'Powerful automation features',
      'Excellent visualization options'
    ],
    cons: [
      'Can be expensive for larger teams',
      'Learning curve for advanced features',
      'Limited features in free plan'
    ]
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    description: 'An all-in-one productivity platform that brings all your work into one place.',
    logo: '/logos/clickup.png',
    website: 'https://clickup.com',
    features: [
      'Task management',
      'Docs & wikis',
      'Real-time collaboration',
      'Custom fields',
      'Goals & portfolios'
    ],
    pricing: {
      free: true,
      startingPrice: '$5/user/month',
      priceRange: '$5-$19/user/month'
    },
    bestFor: [
      'Small to large teams',
      'Remote teams',
      'Agile development',
      'Creative agencies'
    ],
    pros: [
      'Feature-rich free plan',
      'Extensive customization options',
      'Great value for money',
      'Regular feature updates'
    ],
    cons: [
      'Can be overwhelming at first',
      'Mobile app needs improvement',
      'Occasional performance issues'
    ]
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'A flexible workspace that combines notes, docs, and project management in one platform.',
    logo: '/logos/notion.png',
    website: 'https://notion.so',
    features: [
      'Customizable workspaces',
      'Database functionality',
      'Wiki & documentation',
      'Task management',
      'Team collaboration'
    ],
    pricing: {
      free: true,
      startingPrice: '$8/user/month',
      priceRange: '$8-$15/user/month'
    },
    bestFor: [
      'Startups',
      'Small teams',
      'Personal use',
      'Documentation'
    ],
    pros: [
      'Extremely flexible',
      'Great for documentation',
      'Strong collaboration features',
      'Good free plan'
    ],
    cons: [
      'Learning curve for new users',
      'Can be slow with large databases',
      'Limited project management features'
    ]
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'A leading work management platform designed to help teams orchestrate their work.',
    logo: '/logos/asana.png',
    website: 'https://asana.com',
    features: [
      'Timeline & calendar views',
      'Custom fields & forms',
      'Workflow builder',
      'Advanced reporting',
      'Cross-team collaboration'
    ],
    pricing: {
      free: true,
      startingPrice: '$10.99/user/month',
      priceRange: '$10.99-$24.99/user/month'
    },
    bestFor: [
      'Enterprise teams',
      'Cross-functional teams',
      'Marketing & creative',
      'Operations teams'
    ],
    pros: [
      'Clean, intuitive interface',
      'Powerful workflow automation',
      'Excellent team collaboration',
      'Rich feature set'
    ],
    cons: [
      'Premium features are costly',
      'Can be complex for small teams',
      'Limited free plan features'
    ]
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Visual collaboration tool that creates a shared perspective on any project.',
    logo: '/logos/trello.png',
    website: 'https://trello.com',
    features: [
      'Kanban boards',
      'Power-Ups integration',
      'Butler automation',
      'Calendar view',
      'Custom fields'
    ],
    pricing: {
      free: true,
      startingPrice: '$5/user/month',
      priceRange: '$5-$17.50/user/month'
    },
    bestFor: [
      'Small teams',
      'Agile projects',
      'Personal task management',
      'Visual planners'
    ],
    pros: [
      'Easy to use',
      'Great free version',
      'Visual organization',
      'Mobile-friendly'
    ],
    cons: [
      'Limited views',
      'Basic reporting',
      'Can get messy with large projects'
    ]
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Industry-leading project management tool designed specifically for agile software development teams.',
    logo: '/logos/jira.png',
    website: 'https://www.atlassian.com/software/jira',
    features: [
      'Scrum & Kanban boards',
      'Agile reporting',
      'Custom workflows',
      'Advanced permissions',
      'Developer tool integrations'
    ],
    pricing: {
      free: true,
      startingPrice: '$7.50/user/month',
      priceRange: '$7.50-$14.50/user/month'
    },
    bestFor: [
      'Software teams',
      'Agile teams',
      'Large organizations',
      'IT project management'
    ],
    pros: [
      'Powerful for agile development',
      'Extensive customization',
      'Rich reporting features',
      'Strong integration options'
    ],
    cons: [
      'Steep learning curve',
      'Can be overwhelming',
      'Complex setup process'
    ]
  },
  {
    id: 'basecamp',
    name: 'Basecamp',
    description: 'All-in-one project management and team communication tool with a focus on simplicity.',
    logo: '/logos/basecamp.png',
    website: 'https://basecamp.com',
    features: [
      'To-do lists',
      'Message boards',
      'Real-time chat',
      'File storage',
      'Scheduling tools'
    ],
    pricing: {
      free: false,
      startingPrice: '$11/user/month',
      priceRange: '$11/user/month (flat)'
    },
    bestFor: [
      'Remote teams',
      'Client collaboration',
      'Small businesses',
      'Simple project management'
    ],
    pros: [
      'Simple, clean interface',
      'Fixed pricing',
      'Great for communication',
      'Easy client access'
    ],
    cons: [
      'Limited customization',
      'No free plan',
      'Basic reporting features'
    ]
  },
  {
    id: 'smartsheet',
    name: 'Smartsheet',
    description: 'Enterprise-grade work execution platform that combines spreadsheet simplicity with project management power.',
    logo: '/logos/smartsheet.png',
    website: 'https://www.smartsheet.com',
    features: [
      'Spreadsheet interface',
      'Gantt charts',
      'Resource management',
      'Workflow automation',
      'Enterprise security'
    ],
    pricing: {
      free: false,
      startingPrice: '$7/user/month',
      priceRange: '$7-$25/user/month'
    },
    bestFor: [
      'Enterprise organizations',
      'Project portfolio management',
      'Operations teams',
      'Excel power users'
    ],
    pros: [
      'Familiar spreadsheet interface',
      'Strong reporting capabilities',
      'Enterprise-grade security',
      'Extensive templates'
    ],
    cons: [
      'Expensive for small teams',
      'Complex for simple projects',
      'No free plan'
    ]
  },
  {
    id: 'wrike',
    name: 'Wrike',
    description: 'Versatile project management software that scales from professional teams to enterprise organizations.',
    logo: '/logos/wrike.png',
    website: 'https://www.wrike.com',
    features: [
      'Custom workflows',
      'Time tracking',
      'Resource management',
      'Request forms',
      'Proofing & approval'
    ],
    pricing: {
      free: true,
      startingPrice: '$9.80/user/month',
      priceRange: '$9.80-$24.80/user/month'
    },
    bestFor: [
      'Marketing teams',
      'Professional services',
      'Enterprise teams',
      'Creative teams'
    ],
    pros: [
      'Highly customizable',
      'Strong security features',
      'Good for complex projects',
      'Advanced workflow automation'
    ],
    cons: [
      'Steep learning curve',
      'Complex pricing structure',
      'Can be overwhelming'
    ]
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Flexible platform that combines the power of a database with the familiarity of a spreadsheet.',
    logo: '/logos/airtable.png',
    website: 'https://airtable.com',
    features: [
      'Custom databases',
      'Multiple views',
      'Automation',
      'Rich field types',
      'API access'
    ],
    pricing: {
      free: true,
      startingPrice: '$10/user/month',
      priceRange: '$10-$20/user/month'
    },
    bestFor: [
      'Data-driven teams',
      'Content planning',
      'Product management',
      'Inventory tracking'
    ],
    pros: [
      'Highly flexible',
      'Powerful database features',
      'Great for organizing data',
      'Rich integration options'
    ],
    cons: [
      'Learning curve for new users',
      'Can get expensive',
      'Limited project management features'
    ]
  }
]; 