const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  'teja-ai',
  'ninja-chat-ai',
  'onesec',
  'virola',
  'daily-time-tracking',
  'unibee',
  'articial',
  'sigma-browser',
  'flowmino',
  'maple',
  'outline'
];

// Default placeholder logo content (1x1 transparent pixel)
const defaultLogo = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

// Copy placeholder logo for each tool
function copyPlaceholderLogos() {
  for (const tool of tools) {
    const logoPath = path.join(LOGOS_DIR, `${tool}.png`);
    
    // Skip if logo already exists and is not empty
    if (fs.existsSync(logoPath) && fs.statSync(logoPath).size > 0) {
      console.log(`✓ Logo for ${tool} already exists`);
      continue;
    }

    try {
      fs.writeFileSync(logoPath, defaultLogo);
      console.log(`✓ Created placeholder logo for ${tool}`);
    } catch (error) {
      console.error(`✗ Failed to create logo for ${tool}: ${error.message}`);
    }
  }
}

copyPlaceholderLogos(); 