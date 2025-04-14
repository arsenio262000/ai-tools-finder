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
    id: 'customgpt',
    url: 'https://img.icons8.com/color/96/000000/chatgpt.png'
  },
  {
    id: 'cutout-pro',
    url: 'https://img.icons8.com/color/96/000000/cut.png'
  },
  {
    id: 'cygrader',
    url: 'https://img.icons8.com/color/96/000000/test-passed.png'
  },
  {
    id: 'cxcortex',
    url: 'https://img.icons8.com/color/96/000000/brain.png'
  },
  {
    id: 'cyanite-ai',
    url: 'https://img.icons8.com/color/96/000000/musical-notes.png'
  },
  {
    id: 'cyberiskai',
    url: 'https://img.icons8.com/color/96/000000/cyber-security.png'
  },
  {
    id: 'cyborg-con',
    url: 'https://img.icons8.com/color/96/000000/cyborg.png'
  },
  {
    id: 'dachi',
    url: 'https://img.icons8.com/color/96/000000/collaboration.png'
  },
  {
    id: 'dadabots',
    url: 'https://img.icons8.com/color/96/000000/robot-2.png'
  },
  {
    id: 'dailybot',
    url: 'https://img.icons8.com/color/96/000000/calendar.png'
  },
  {
    id: 'dailybot-ai',
    url: 'https://img.icons8.com/color/96/000000/robot-2.png'
  },
  {
    id: 'dalle-2',
    url: 'https://img.icons8.com/color/96/000000/paint-palette.png'
  },
  {
    id: 'dallelist',
    url: 'https://img.icons8.com/color/96/000000/list.png'
  },
  {
    id: 'dante-ai',
    url: 'https://img.icons8.com/color/96/000000/literature.png'
  },
  {
    id: 'dappergpt',
    url: 'https://img.icons8.com/color/96/000000/bow-tie.png'
  },
  {
    id: 'darrow-ai',
    url: 'https://img.icons8.com/color/96/000000/law.png'
  },
  {
    id: 'dart',
    url: 'https://img.icons8.com/color/96/000000/dart.png'
  },
  {
    id: 'dasha',
    url: 'https://img.icons8.com/color/96/000000/microphone.png'
  }
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (response) => {
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
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function downloadLogos() {
  console.log('Starting logo downloads...');
  
  for (const tool of tools) {
    const dest = path.join(LOGOS_DIR, `${tool.id}.png`);
    console.log(`Downloading ${tool.id} logo...`);
    
    try {
      await downloadFile(tool.url, dest);
      console.log(`✓ Downloaded ${tool.id} logo`);
    } catch (error) {
      console.error(`✗ Failed to download ${tool.id} logo:`, error.message);
    }
  }
  
  console.log('Finished downloading logos');
}

downloadLogos(); 