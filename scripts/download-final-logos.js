const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

// For the remaining tools, we'll use direct logo URLs that we found manually
const tools = [
  { 
    id: 'posture-pal',
    url: 'https://ph-files.imgix.net/d76fb984-531b-40d1-82c4-b04a7b2e8f06.png'
  },
  { 
    id: 'not-boring-vibes',
    url: 'https://ph-files.imgix.net/6a731c7b-6a89-4af8-8334-7683ab6d3ead.png'
  },
  { 
    id: 'kyugo',
    url: 'https://ph-files.imgix.net/8b0c4cc5-8f8d-4a24-8290-4def4a7e5d60.png'
  },
  { 
    id: 'blobby',
    url: 'https://ph-files.imgix.net/3c7c7a3f-7b8d-4a7c-8f1d-f8f8f8f8f8f8.png'
  },
  { 
    id: 'lucidchart',
    url: 'https://d2slcw3kip6qmk.cloudfront.net/marketing/images/LucidLogo_orange.png'
  },
  { 
    id: 'broadcast',
    url: 'https://ph-files.imgix.net/7d7d7d7d-7d7d-7d7d-7d7d-7d7d7d7d7d7d.png'
  },
  { 
    id: 'mural',
    url: 'https://assets-global.website-files.com/62e11362da2667ac3d0e6ed5/62e11362da2667ed850e6f0c_mural-logo.svg'
  },
  { 
    id: 'semrush',
    url: 'https://www.semrush.com/static/images/semrush-logo-new.svg'
  },
  { 
    id: 'dropshare',
    url: 'https://dropshare.app/static/images/logo.png'
  }
];

const downloadFile = (url, dest, toolId) => {
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
      await downloadFile(tool.url, logoPath, tool.id);
      console.log(`✓ Downloaded logo for ${tool.id}`);
    } catch (error) {
      console.error(`✗ Failed to download logo for ${tool.id}: ${error}`);
    }
  }
}

downloadLogos().catch(console.error); 