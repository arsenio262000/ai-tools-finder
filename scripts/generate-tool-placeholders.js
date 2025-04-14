const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  { id: 'brain-fm', name: 'Brain.FM' },
  { id: 'inquisite-ai', name: 'Inquisite AI' },
  { id: 'atomic-mail', name: 'Atomic Mail' },
  { id: 'atomic', name: 'Atomic' },
  { id: 'planny', name: 'Planny' },
  { id: 'scrumbuiss', name: 'Scrumbuiss' },
  { id: 'clipse', name: 'Clipse' },
  { id: 'freedcamp', name: 'Freedcamp' },
  { id: 'flow', name: 'Flow' },
  { id: 'celoxis', name: 'Celoxis' },
  { id: 'joi-planner', name: 'Joi Planner' },
  { id: 'taskable', name: 'Taskable' }
];

// Function to generate a color based on the tool name
function generateColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

// Function to get initials from name
function getInitials(name) {
  return name
    .split(/[\s-]/)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

// Generate placeholder logo
function generatePlaceholderLogo(tool) {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = generateColor(tool.name);
  ctx.fillRect(0, 0, size, size);

  // Set text
  const initials = getInitials(tool.name);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, size / 2, size / 2);

  return canvas;
}

// Generate and save logos
async function generateLogos() {
  for (const tool of tools) {
    const logoPath = path.join(LOGOS_DIR, `${tool.id}.png`);
    
    // Skip if logo already exists
    if (fs.existsSync(logoPath)) {
      console.log(`✓ Logo for ${tool.id} already exists`);
      continue;
    }

    try {
      const canvas = generatePlaceholderLogo(tool);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(logoPath, buffer);
      console.log(`✓ Generated placeholder logo for ${tool.id}`);
    } catch (error) {
      console.error(`✗ Failed to generate logo for ${tool.id}: ${error.message}`);
    }
  }
}

generateLogos().catch(console.error); 