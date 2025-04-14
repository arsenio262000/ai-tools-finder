// import { StaticImageData } from 'next/image';

export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  link: string;
  categories: string[];
  platforms: string[];
  pricing: string[];
  roles: string[];
  userTypes: string[];
  deployments: string[];
  industries: string[];
  customizability: string;
  isSponsored?: boolean;
  isEditorChoice?: boolean;
  isRisingStar?: boolean;
  isNew?: boolean;
}

// Helper function to get logo URL from website URL
export const getLogoUrl = (websiteUrl: string): string => {
  // Extract domain from URL
  const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  return `https://logo.clearbit.com/${domain}`;
};

export const tools: Tool[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    websiteUrl: 'https://www.hubspot.com',
    description: 'CRM platform for growing businesses',
    category: ['CRM', 'Marketing']
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    websiteUrl: 'https://www.clickup.com',
    description: 'All-in-one productivity platform',
    category: ['Project Management', 'Productivity']
  },
  {
    id: 'monday',
    name: 'Monday.com',
    websiteUrl: 'https://www.monday.com',
    description: 'Work OS for teams',
    category: ['Project Management', 'Collaboration']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    websiteUrl: 'https://www.zapier.com',
    description: 'Automation for busy people',
    category: ['Automation', 'Integration']
  },
  {
    id: 'slack',
    name: 'Slack',
    websiteUrl: 'https://www.slack.com',
    description: 'Business communication platform',
    category: ['Communication', 'Collaboration']
  },
  {
    id: 'notion',
    name: 'Notion',
    websiteUrl: 'https://www.notion.so',
    description: 'All-in-one workspace',
    category: ['Productivity', 'Documentation']
  }
];

// Helper functions
export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return tools.filter(tool => tool.category?.includes(category));
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  tools.forEach(tool => {
    tool.category?.forEach(cat => categories.add(cat));
  });
  return Array.from(categories);
};

export const getToolUrl = (id: string): string | undefined => {
  return getToolById(id)?.websiteUrl;
}; 