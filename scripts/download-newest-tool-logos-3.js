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
    id: 'faraday',
    url: 'https://img.icons8.com/color/96/000000/circuit.png'
  },
  {
    id: 'fashionadvisorai',
    url: 'https://img.icons8.com/color/96/000000/clothes.png'
  },
  {
    id: 'geniea',
    url: 'https://img.icons8.com/color/96/000000/genie.png'
  },
  {
    id: 'geniepm',
    url: 'https://img.icons8.com/color/96/000000/project-management.png'
  },
  {
    id: 'genius-ai',
    url: 'https://img.icons8.com/color/96/000000/genius.png'
  },
  {
    id: 'habit-driven',
    url: 'https://img.icons8.com/color/96/000000/todo-list.png'
  },
  {
    id: 'hachi',
    url: 'https://img.icons8.com/color/96/000000/share-2.png'
  },
  {
    id: 'hacker-ai',
    url: 'https://img.icons8.com/color/96/000000/cyber-security.png'
  },
  {
    id: 'jpgrm',
    url: 'https://img.icons8.com/color/96/000000/image-file.png'
  },
  {
    id: 'jpt',
    url: 'https://img.icons8.com/color/96/000000/code.png'
  },
  {
    id: 'jrnylist',
    url: 'https://img.icons8.com/color/96/000000/map-marker.png'
  },
  {
    id: 'jua-ai',
    url: 'https://img.icons8.com/color/96/000000/partly-cloudy-day.png'
  },
  {
    id: 'khrisa-ai',
    url: 'https://img.icons8.com/color/96/000000/money.png'
  },
  {
    id: 'khroma',
    url: 'https://img.icons8.com/color/96/000000/color-palette.png'
  },
  {
    id: 'kickresume',
    url: 'https://img.icons8.com/color/96/000000/resume.png'
  },
  {
    id: 'kidgeni',
    url: 'https://img.icons8.com/color/96/000000/child-safe-zone.png'
  },
  {
    id: 'kidotail-ai',
    url: 'https://img.icons8.com/color/96/000000/learning.png'
  },
  {
    id: 'learnlingo',
    url: 'https://img.icons8.com/color/96/000000/language.png'
  },
  {
    id: 'learnly',
    url: 'https://img.icons8.com/color/96/000000/training.png'
  },
  {
    id: 'learnsmarter-ai',
    url: 'https://img.icons8.com/color/96/000000/brain.png'
  },
  {
    id: 'learnt-ai',
    url: 'https://img.icons8.com/color/96/000000/book-shelf.png'
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