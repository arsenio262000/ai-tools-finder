const getLogoUrl = (domain) => {
  // Remove http(s):// and www. from the domain
  domain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
  // Remove everything after the first slash
  domain = domain.split('/')[0];
  return `https://logo.clearbit.com/${domain}`;
};

// First compile the TypeScript file
require('./compile-tools');

// Generate logo URLs automatically from the tool URLs
const generateLogoUrls = () => {
  const urls = {};
  const tools = require('./tools.js').tools;
  
  tools.forEach(tool => {
    const domain = tool.link.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    urls[tool.id] = `https://logo.clearbit.com/${domain}`;
  });
  
  return urls;
};

const logoUrls = generateLogoUrls();

const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

// Function to download a file with fallback to Google Favicon API
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
  for (const [id, url] of Object.entries(logoUrls)) {
    const logoPath = path.join(LOGOS_DIR, `${id}.png`);
    
    // Skip if logo already exists
    if (fs.existsSync(logoPath)) {
      console.log(`✓ Logo for ${id} already exists`);
      continue;
    }

    try {
      await downloadFile(url, logoPath, id);
      console.log(`✓ Downloaded logo for ${id}`);
    } catch (error) {
      console.error(`✗ Failed to download logo for ${id}: ${error}`);
    }
  }
}

downloadLogos().catch(console.error); 