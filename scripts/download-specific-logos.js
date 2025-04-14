const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

const tools = [
  { id: 'fireflies-ai', url: 'https://logo.clearbit.com/fireflies.ai' },
  { id: 'posture-pal', url: 'https://logo.clearbit.com/posturepal.app' },
  { id: 'bundleiq', url: 'https://logo.clearbit.com/bundleiq.com' },
  { id: 'aha', url: 'https://logo.clearbit.com/aha.io' },
  { id: 'not-boring-vibes', url: 'https://logo.clearbit.com/notboringvibes.app' },
  { id: 'balance', url: 'https://logo.clearbit.com/balance.so' },
  { id: 'blinkist', url: 'https://logo.clearbit.com/blinkist.com' },
  { id: 'make', url: 'https://logo.clearbit.com/make.com' },
  { id: 'ucal', url: 'https://logo.clearbit.com/ucal.app' },
  { id: 'kyugo', url: 'https://logo.clearbit.com/kyugo.app' },
  { id: 'blobby', url: 'https://logo.clearbit.com/blobby.app' },
  { id: 'lucidchart', url: 'https://logo.clearbit.com/lucidchart.com' },
  { id: 'broadcast', url: 'https://logo.clearbit.com/broadcast.app' },
  { id: 'mural', url: 'https://logo.clearbit.com/mural.co' },
  { id: 'semrush', url: 'https://logo.clearbit.com/semrush.com' },
  { id: 'dropshare', url: 'https://logo.clearbit.com/dropshare.app' }
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