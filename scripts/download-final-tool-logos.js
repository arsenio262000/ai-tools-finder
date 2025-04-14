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
    id: 'notis',
    url: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8d/47/c7/8d47c7f8-8eb8-4d6f-8f64-b5d123c83d7b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp'
  },
  {
    id: 'milestones',
    url: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/2a/c6/7e/2ac67e8c-f3c3-df88-c5b3-2c91f6f63a94/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp'
  },
  {
    id: 'craeftig',
    url: 'https://play-lh.googleusercontent.com/craeftig-logo.png'
  },
  {
    id: 'image-to-video-ai',
    url: 'https://imagetovideoai.com/static/images/logo.png'
  },
  {
    id: 'mumble-note',
    url: 'https://mumblenote.com/static/images/logo.png'
  },
  {
    id: 'autentik-ai',
    url: 'https://autentik.ai/static/images/logo.png'
  },
  {
    id: 'mailwatcher',
    url: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/36/c6/ba/36c6ba8b-1d8e-f699-6f27-8b08d1418f1e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp'
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