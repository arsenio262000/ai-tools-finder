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
    id: 'dynaboard',
    url: 'https://img.icons8.com/color/96/000000/dashboard-layout.png'
  },
  {
    id: 'dynoweb-5',
    url: 'https://img.icons8.com/color/96/000000/web-design.png'
  },
  {
    id: 'dysai-you',
    url: 'https://img.icons8.com/color/96/000000/learning.png'
  },
  {
    id: 'dystr',
    url: 'https://img.icons8.com/color/96/000000/data-backup.png'
  },
  {
    id: 'dyvo',
    url: 'https://img.icons8.com/color/96/000000/video-editing.png'
  },
  {
    id: 'e-legal-ai',
    url: 'https://img.icons8.com/color/96/000000/law.png'
  },
  {
    id: 'earkick',
    url: 'https://img.icons8.com/color/96/000000/audio-wave.png'
  },
  {
    id: 'easy-sell-ai',
    url: 'https://img.icons8.com/color/96/000000/sale.png'
  },
  {
    id: 'easy-peasy',
    url: 'https://img.icons8.com/color/96/000000/easy.png'
  },
  {
    id: 'easymessage',
    url: 'https://img.icons8.com/color/96/000000/chat.png'
  },
  {
    id: 'easypromp',
    url: 'https://img.icons8.com/color/96/000000/video-message.png'
  },
  {
    id: 'easyseo-ai',
    url: 'https://img.icons8.com/color/96/000000/google-web-search.png'
  },
  {
    id: 'ebi-ai',
    url: 'https://img.icons8.com/color/96/000000/business.png'
  },
  {
    id: 'ebsynth',
    url: 'https://img.icons8.com/color/96/000000/video-card.png'
  },
  {
    id: 'echofox',
    url: 'https://img.icons8.com/color/96/000000/audio-wave2.png'
  },
  {
    id: 'echowin',
    url: 'https://img.icons8.com/color/96/000000/phone.png'
  },
  {
    id: 'ecold-ai',
    url: 'https://img.icons8.com/color/96/000000/email.png'
  },
  {
    id: 'ecommerce-ai',
    url: 'https://img.icons8.com/color/96/000000/shopping-cart.png'
  },
  {
    id: 'erett-musi',
    url: 'https://img.icons8.com/color/96/000000/musical-notes.png'
  },
  {
    id: 'edaly',
    url: 'https://img.icons8.com/color/96/000000/training.png'
  },
  {
    id: 'eddy-ai',
    url: 'https://img.icons8.com/color/96/000000/video-trimming.png'
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