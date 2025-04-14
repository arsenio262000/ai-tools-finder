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
    id: 'shimmer',
    url: 'https://logo.clearbit.com/shimmer.care'
  },
  {
    id: 'mailbird',
    url: 'https://logo.clearbit.com/getmailbird.com'
  },
  {
    id: 'avoma',
    url: 'https://logo.clearbit.com/avoma.com'
  },
  {
    id: 'moleskine-timepage',
    url: 'https://logo.clearbit.com/moleskine.com'
  },
  {
    id: 'habitnow',
    url: 'https://logo.clearbit.com/habitnow.app'
  },
  {
    id: 'tangerine',
    url: 'https://logo.clearbit.com/tangerine.app'
  },
  {
    id: 'fastmail',
    url: 'https://logo.clearbit.com/fastmail.com'
  },
  {
    id: 'way-of-life',
    url: 'https://logo.clearbit.com/wayoflifeapp.com'
  },
  {
    id: 'atoms',
    url: 'https://logo.clearbit.com/atomsapp.com'
  },
  {
    id: 'visor',
    url: 'https://logo.clearbit.com/visor.us'
  },
  {
    id: 'dailyhabits',
    url: 'https://logo.clearbit.com/dailyhabits.app'
  },
  {
    id: 'bubble-io',
    url: 'https://logo.clearbit.com/bubble.io'
  },
  {
    id: 'headway',
    url: 'https://logo.clearbit.com/headway.app'
  },
  {
    id: 'scoro',
    url: 'https://logo.clearbit.com/scoro.com'
  },
  {
    id: '2do',
    url: 'https://logo.clearbit.com/2doapp.com'
  },
  {
    id: 'fable',
    url: 'https://logo.clearbit.com/fable.app'
  }
];

const downloadFile = (url, dest, toolId) => {
  return new Promise((resolve, reject) => {
    const tryDownload = (downloadUrl) => {
      const file = fs.createWriteStream(dest);
      
      https.get(downloadUrl, {
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
          
          // If Clearbit fails, try Google Favicon API as fallback
          if (downloadUrl.includes('clearbit')) {
            const domain = downloadUrl.split('/').pop();
            const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
            console.log(`Trying Google Favicon API for ${toolId}...`);
            tryDownload(googleUrl);
          } else {
            reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
          }
        }
      }).on('error', err => {
        file.close();
        fs.unlink(dest, () => {});
        
        // If Clearbit fails, try Google Favicon API as fallback
        if (downloadUrl.includes('clearbit')) {
          const domain = downloadUrl.split('/').pop();
          const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
          console.log(`Trying Google Favicon API for ${toolId}...`);
          tryDownload(googleUrl);
        } else {
          reject(err.message);
        }
      });
    };

    tryDownload(url);
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
      await downloadFile(tool.url, logoPath, tool.id);
      console.log(`✓ Downloaded logo for ${tool.id}`);
    } catch (error) {
      console.error(`✗ Failed to download logo for ${tool.id}: ${error}`);
    }
  }
}

downloadLogos().catch(console.error); 