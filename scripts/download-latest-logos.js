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
    id: 'confluence',
    url: 'https://logo.clearbit.com/atlassian.com'
  },
  {
    id: 'timing',
    url: 'https://logo.clearbit.com/timingapp.com'
  },
  {
    id: 'uly',
    url: 'https://logo.clearbit.com/uly.app'
  },
  {
    id: 'habitshare',
    url: 'https://logo.clearbit.com/habitshare.app'
  },
  {
    id: 'backlog',
    url: 'https://logo.clearbit.com/backlog.com'
  },
  {
    id: 'not-boring-timer',
    url: 'https://logo.clearbit.com/notboring.app'
  },
  {
    id: 'stuff',
    url: 'https://logo.clearbit.com/stuffapp.com'
  },
  {
    id: 'attio',
    url: 'https://logo.clearbit.com/attio.com'
  },
  {
    id: 'superhabit',
    url: 'https://logo.clearbit.com/superhabit.app'
  },
  {
    id: 'texts',
    url: 'https://logo.clearbit.com/texts.com'
  },
  {
    id: 'ready-calendar',
    url: 'https://logo.clearbit.com/readycalendar.com'
  },
  {
    id: 'inboxfreedom',
    url: 'https://logo.clearbit.com/inboxfreedom.com'
  },
  {
    id: 'productboard',
    url: 'https://logo.clearbit.com/productboard.com'
  },
  {
    id: 'monica-ai',
    url: 'https://logo.clearbit.com/monica.ai'
  },
  {
    id: 'manganum',
    url: 'https://logo.clearbit.com/manganum.app'
  },
  {
    id: 'bubbles-ai',
    url: 'https://logo.clearbit.com/bubbles.ai'
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
      await downloadFile(tool.url, logoPath);
      console.log(`✓ Downloaded logo for ${tool.id}`);
    } catch (error) {
      console.error(`✗ Failed to download logo for ${tool.id}: ${error}`);
    }
  }
}

downloadLogos().catch(console.error); 