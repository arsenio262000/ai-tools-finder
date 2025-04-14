import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import slugify from 'slugify';

interface CSVTool {
    'AI Tool Name': string;
    'Description': string;
    'Free/Paid/Other': string;
    'Useable For': string;
    'Charges': string;
    'Review': string;
    'Tool Link': string;
    'Major Category': string;
}

interface ProcessedTool {
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
    isNew?: boolean;
}

function cleanCategories(useableFor: string): string[] {
    return useableFor
        .split('/')
        .map(cat => cat.trim())
        .filter(cat => cat)
        .map(cat => slugify(cat.toLowerCase(), { replacement: '-' }));
}

function getPricing(pricingStr: string, charges: string): string[] {
    const pricing: string[] = [];
    
    if (pricingStr.toLowerCase().includes('free')) {
        pricing.push('free');
    }
    if (pricingStr.toLowerCase().includes('paid')) {
        pricing.push('paid');
    }
    if (pricingStr.toLowerCase().includes('freemium')) {
        pricing.push('free', 'premium');
    }
    if (charges && charges.toLowerCase().includes('enterprise')) {
        pricing.push('enterprise');
    }
    
    return pricing.length ? pricing : ['contact-sales'];
}

function getPlatforms(link: string): string[] {
    const platforms = ['web'];
    if (link.includes('app.')) platforms.push('mobile');
    return platforms;
}

function getUserTypes(pricing: string[]): string[] {
    const types = new Set<string>();
    
    if (pricing.includes('free')) types.add('individual');
    if (pricing.includes('premium')) types.add('team');
    if (pricing.includes('enterprise')) types.add('enterprise');
    
    return Array.from(types);
}

function getRoles(categories: string[]): string[] {
    const roleMap: { [key: string]: string[] } = {
        'image': ['designer', 'content-creator'],
        'text': ['writer', 'content-creator'],
        'audio': ['audio-engineer', 'content-creator'],
        'video': ['video-editor', 'content-creator'],
        'code': ['developer', 'engineer'],
        '3d': ['3d-artist', 'designer'],
        'email': ['marketer', 'business'],
        'social-media': ['marketer', 'social-media-manager'],
        'fitness': ['trainer', 'individual'],
        'other': ['professional']
    };

    const roles = new Set<string>();
    categories.forEach(cat => {
        const mappedRoles = roleMap[cat] || ['professional'];
        mappedRoles.forEach(role => roles.add(role));
    });

    return Array.from(roles);
}

function getClearbitLogo(link: string): string {
    try {
        const domain = new URL(link).hostname.replace('www.', '');
        return `https://logo.clearbit.com/${domain}`;
    } catch (e) {
        return '';
    }
}

function generateUniqueId(baseId: string, existingIds: Set<string>): string {
    let uniqueId = baseId;
    let counter = 1;
    while (existingIds.has(uniqueId)) {
        uniqueId = `${baseId}-${counter}`;
        counter++;
    }
    return uniqueId;
}

function processTools(csvPath: string): ProcessedTool[] {
    // Read and parse CSV
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    }) as CSVTool[];

    const existingIds = new Set<string>();
    
    // Process each tool
    return records.map(record => {
        const baseId = slugify(record['AI Tool Name'].toLowerCase(), { strict: true });
        const id = generateUniqueId(baseId, existingIds);
        existingIds.add(id);
        
        const categories = cleanCategories(record['Useable For']);
        const pricing = getPricing(record['Free/Paid/Other'], record['Charges']);
        const link = record['Tool Link'].split('?')[0]; // Remove UTM parameters
        const clearbitLogo = getClearbitLogo(link);
        
        return {
            id,
            name: record['AI Tool Name'].trim(),
            description: record['Description'].trim(),
            logo: clearbitLogo || `/logos/${id}.png`,
            link,
            categories: [record['Major Category'], ...categories],
            platforms: getPlatforms(record['Tool Link']),
            pricing,
            roles: getRoles(categories),
            userTypes: getUserTypes(pricing),
            deployments: ['cloud'],
            industries: ['all'],
            customizability: 'medium',
            isNew: true
        };
    });
}

// Execute the script
const csvPath = path.join(process.cwd(), 'all_ai_tool.csv');
const processedTools = processTools(csvPath);

// Write the result to a new file
const outputPath = path.join(process.cwd(), 'src/data/processed-tools.ts');
const fileContent = `
import { Tool } from '@/types';

export const tools: Tool[] = ${JSON.stringify(processedTools, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Processed ${processedTools.length} tools and saved to ${outputPath}`); 