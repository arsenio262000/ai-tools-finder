export interface Tool {
    id: string;
    name: string;
    description: string;
    logo: string;
    link: string;
    categories: string[];
    isEditorChoice?: boolean;
    platforms: string[];
    userTypes: string[];
    roles: string[];
    industries: string[];
    deployments: string[];
    pricing: string[];
    customizability: string;
} 