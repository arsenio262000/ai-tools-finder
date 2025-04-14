const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  { id: 'saam', name: 'Saam' },
  { id: 'saasydb', name: 'SaasyDB' },
  { id: 'safebet', name: 'Safebet' },
  { id: 'safespelling', name: 'Safespelling' },
  { id: 'sales-stack', name: 'Sales Stack' },
  { id: 'sales-zen', name: 'Sales Zen' },
  { id: 'salesboom-ai', name: 'Salesboom.AI' },
  { id: 'salesforge', name: 'Salesforge' },
  { id: 'salesgpt', name: 'SalesGPT' },
  { id: 'salesmind-ai', name: 'Salesmind AI' },
  { id: 'scale', name: 'Scale' },
  { id: 'scalenut', name: 'Scalenut' },
  { id: 'scanboy', name: 'Scanboy' },
  { id: 'scannergo', name: 'Scannergo' },
  { id: 'secretary-gpt', name: 'Secretary GPT' },
  { id: 'secureframe', name: 'Secureframe' },
  { id: 'seek', name: 'Seek' },
  { id: 'seo-ai', name: 'SEO.AI' },
  { id: 'seo-app', name: 'SEO.App' },
  { id: 'soap-note-ai', name: 'Soap Note AI' },
  { id: 'social-gpt', name: 'Social GPT' },
  { id: 'social-intents', name: 'Social Intents' },
  { id: 'social-magic', name: 'Social Magic' },
  { id: 'storywiz', name: 'Storywiz' },
  { id: 'storywizard', name: 'Storywizard' },
  { id: 'straico', name: 'Straico' },
  { id: 'stratup-ai', name: 'Stratup.AI' }
];

const colors = [
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Yellow
  '#6366F1', // Indigo
];

function generatePlaceholderLogo(tool) {
  const width = 128;
  const height = 128;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Random background color
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Text settings
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw first letter
  const letter = tool.name[0];
  ctx.fillText(letter, width / 2, height / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(LOGOS_DIR, `${tool.id}.png`);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, buffer);
    console.log(`Generated placeholder logo for ${tool.id}`);
  } else {
    console.log(`Logo already exists for ${tool.id}`);
  }
}

// Generate placeholder logos for all tools
tools.forEach(generatePlaceholderLogo); 