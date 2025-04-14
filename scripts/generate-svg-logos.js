const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  { id: 'oyster-hr', name: 'Oyster HR' },
  { id: 'survey-sparrow', name: 'SurveySparrow' },
  { id: 'yesware', name: 'Yesware' },
  { id: 'shoeboxed', name: 'Shoeboxed' },
  { id: 'dext', name: 'Dext' },
  { id: 'teja-ai', name: 'Teja AI' },
  { id: 'ninja-chat-ai', name: 'NinjaChat AI' },
  { id: 'onesec', name: 'OneSec' },
  { id: 'virola', name: 'Virola' },
  { id: 'daily-time-tracking', name: 'Daily Time Tracking' },
  { id: 'unibee', name: 'UniBee' },
  { id: 'articial', name: 'Articial' },
  { id: 'sigma-browser', name: 'Sigma Browser' },
  { id: 'flowmino', name: 'Flowmino' },
  { id: 'maple', name: 'Maple' },
  { id: 'outline', name: 'Outline' }
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

// Generate SVG logo
function generateSVGLogo(tool) {
  const color = generateColor(tool.name);
  const initials = getInitials(tool.name);
  
  return `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="${color}"/>
    <text x="256" y="256" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
      ${initials}
    </text>
  </svg>`;
}

// Generate and save logos
function generateLogos() {
  for (const tool of tools) {
    const logoPath = path.join(LOGOS_DIR, `${tool.id}.svg`);
    const pngPath = path.join(LOGOS_DIR, `${tool.id}.png`);
    
    // Skip if PNG logo already exists and is not empty
    if (fs.existsSync(pngPath) && fs.statSync(pngPath).size > 100) {
      console.log(`✓ Logo for ${tool.id} already exists`);
      continue;
    }

    try {
      const svg = generateSVGLogo(tool);
      fs.writeFileSync(logoPath, svg);
      console.log(`✓ Generated SVG logo for ${tool.id}`);
      
      // Also save as PNG
      fs.copyFileSync(logoPath, pngPath);
      console.log(`✓ Converted to PNG for ${tool.id}`);
    } catch (error) {
      console.error(`✗ Failed to generate logo for ${tool.id}: ${error.message}`);
    }
  }
}

generateLogos(); 