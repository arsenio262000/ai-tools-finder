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
    id: 'uly',
    url: 'https://uly.app/apple-touch-icon.png'
  },
  {
    id: 'habitshare',
    url: 'https://habitshare.app/apple-touch-icon.png'
  },
  {
    id: 'not-boring-timer',
    url: 'https://notboring.app/timer/apple-touch-icon.png'
  },
  {
    id: 'stuff',
    url: 'https://stuffapp.com/apple-touch-icon.png'
  },
  {
    id: 'superhabit',
    url: 'https://superhabit.app/apple-touch-icon.png'
  },
  {
    id: 'ready-calendar',
    url: 'https://readycalendar.com/apple-touch-icon.png'
  },
  {
    id: 'monica-ai',
    url: 'https://monica.ai/apple-touch-icon.png'
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
        
        // Try favicon.ico as fallback
        const domain = new URL(url).origin;
        const faviconUrl = `${domain}/favicon.ico`;
        if (!url.includes('favicon.ico')) {
          console.log(`Trying favicon.ico for ${dest}...`);
          downloadFile(faviconUrl, dest)
            .then(resolve)
            .catch(reject);
        } else {
          reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
        }
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