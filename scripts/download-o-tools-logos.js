const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  {
    id: 'olli-ai',
    url: 'https://olli.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/artificial-intelligence.png'
  },
  {
    id: 'olvy',
    url: 'https://olvy.co/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/feedback.png'
  },
  {
    id: 'olvy-changelog',
    url: 'https://olvy.co/changelog/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/task-completed.png'
  },
  {
    id: 'olympia',
    url: 'https://olympia.app/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/project-management.png'
  },
  {
    id: 'omneky',
    url: 'https://omneky.com/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/commercial.png'
  },
  {
    id: 'omnigpt',
    url: 'https://omnigpt.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/bot.png'
  },
  {
    id: 'omniinfer',
    url: 'https://omniinfer.io/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/artificial-intelligence.png'
  },
  {
    id: 'once-upon',
    url: 'https://onceupon.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/storytelling.png'
  },
  {
    id: 'one-ai',
    url: 'https://one.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/brain.png'
  },
  {
    id: 'one-more',
    url: 'https://onemore.app/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/plus-math.png'
  },
  {
    id: 'one-panel',
    url: 'https://onepanel.io/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/dashboard-layout.png'
  },
  {
    id: 'oneconnect',
    url: 'https://oneconnect.app/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/communication.png'
  },
  {
    id: 'onesta',
    url: 'https://onesta.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/trust.png'
  },
  {
    id: 'onesub',
    url: 'https://onesub.io/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/subscription.png'
  },
  {
    id: 'onetone-ai',
    url: 'https://onetone.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/audio-wave.png'
  }
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    }, response => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
      }
    }).on('error', err => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
};

// Download all logos
async function downloadLogos() {
  for (const tool of tools) {
    const logoPath = path.join(LOGOS_DIR, `${tool.id}.png`);
    
    // Skip if logo already exists
    if (fs.existsSync(logoPath)) {
      console.log(`✓ Logo for ${tool.id} already exists`);
      continue;
    }

    try {
      // Try to download the primary logo
      await downloadFile(tool.url, logoPath);
      console.log(`✓ Downloaded logo for ${tool.id}`);
    } catch (error) {
      console.log(`⚠ Primary logo failed for ${tool.id}, trying fallback...`);
      try {
        // If primary fails, try the fallback
        await downloadFile(tool.fallbackUrl, logoPath);
        console.log(`✓ Downloaded fallback logo for ${tool.id}`);
      } catch (fallbackError) {
        console.error(`✗ Failed to download both primary and fallback logos for ${tool.id}`);
      }
    }
  }
}

downloadLogos().catch(console.error); 