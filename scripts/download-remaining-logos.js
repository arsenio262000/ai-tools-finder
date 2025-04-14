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
    id: 'supasend',
    urls: [
      'https://supasend.io/logo.png',
      'https://supasend.io/favicon.ico',
      'https://ph-files.imgix.net/supasend-logo.png',
      'https://assets.supasend.io/logo.png'
    ]
  },
  {
    id: 'gort',
    urls: [
      'https://gort.dev/logo.png',
      'https://gort.dev/favicon.ico',
      'https://ph-files.imgix.net/gort-logo.png',
      'https://assets.gort.dev/logo.png'
    ]
  },
  {
    id: 'taskpaper',
    urls: [
      'https://www.taskpaper.com/assets/images/logo.png',
      'https://www.taskpaper.com/favicon.ico',
      'https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/8d/47/c7/8d47c7f8-8eb8-4d6f-8f64-b5d123c83d7b/source/512x512bb.jpg'
    ]
  },
  {
    id: 'sidenotes',
    urls: [
      'https://www.sidenotes.io/logo.png',
      'https://www.sidenotes.io/favicon.ico',
      'https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/8d/47/c7/8d47c7f8-8eb8-4d6f-8f64-b5d123c83d7b/source/512x512bb.jpg'
    ]
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

    let success = false;
    for (const url of tool.urls) {
      try {
        await downloadFile(url, logoPath);
        console.log(`✓ Downloaded logo for ${tool.id} from ${url}`);
        success = true;
        break;
      } catch (error) {
        console.log(`✗ Failed to download logo for ${tool.id} from ${url}: ${error}`);
      }
    }

    if (!success) {
      console.error(`✗ Failed to download logo for ${tool.id} from all sources`);
    }
  }
}

downloadLogos().catch(console.error); 