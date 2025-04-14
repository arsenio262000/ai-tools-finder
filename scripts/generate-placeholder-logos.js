const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  { id: 'playstrict', name: 'Playstrict' },
  { id: 'plazmapun', name: 'Plazmapun' },
  { id: 'plicanta', name: 'Plicanta' },
  { id: 'pliny', name: 'Pliny' },
  { id: 'plugin-sugg', name: 'Plugin Sugg' },
  { id: 'plumy', name: 'Plumy' },
  { id: 'plus-ai-for', name: 'Plus AI For' },
  { id: 'plus-ai-qbr', name: 'Plus AI Qbr' },
  { id: 'plusdocs', name: 'Plusdocs' },
  { id: 'pneuma', name: 'Pneuma' },
  { id: 'pocket-ai', name: 'Pocket AI' },
  { id: 'pod', name: 'Pod' },
  { id: 'pod-genie', name: 'Pod Genie' },
  { id: 'podai', name: 'Podai' },
  { id: 'podbrews', name: 'Podbrews' },
  { id: 'podcast-ma', name: 'Podcast Ma' }
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