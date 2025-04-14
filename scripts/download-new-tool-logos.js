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
    id: 'playstrict',
    url: 'https://logo.clearbit.com/playstrict.com'
  },
  {
    id: 'plazmapun',
    url: 'https://logo.clearbit.com/plazmapun.com'
  },
  {
    id: 'plicanta',
    url: 'https://logo.clearbit.com/plicanta.com'
  },
  {
    id: 'pliny',
    url: 'https://logo.clearbit.com/pliny.ai'
  },
  {
    id: 'plugin-sugg',
    url: 'https://logo.clearbit.com/pluginsugg.dev'
  },
  {
    id: 'plumy',
    url: 'https://logo.clearbit.com/plumy.com'
  },
  {
    id: 'plus-ai-for',
    url: 'https://logo.clearbit.com/plusaifor.ai'
  },
  {
    id: 'plus-ai-qbr',
    url: 'https://logo.clearbit.com/plusaiqbr.ai'
  },
  {
    id: 'plusdocs',
    url: 'https://logo.clearbit.com/plusdocs.com'
  },
  {
    id: 'pneuma',
    url: 'https://logo.clearbit.com/pneuma.app'
  },
  {
    id: 'pocket-ai',
    url: 'https://logo.clearbit.com/pocketai.app'
  },
  {
    id: 'pod',
    url: 'https://logo.clearbit.com/pod.work'
  },
  {
    id: 'pod-genie',
    url: 'https://logo.clearbit.com/podgenie.ai'
  },
  {
    id: 'podai',
    url: 'https://logo.clearbit.com/podai.com'
  },
  {
    id: 'podbrews',
    url: 'https://logo.clearbit.com/podbrews.com'
  },
  {
    id: 'podcast-ma',
    url: 'https://logo.clearbit.com/podcastma.com'
  }
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
    }, response => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        file.close();
        fs.unlink(dest, () => {}); // Delete the file async
        reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
      }
    }).on('error', err => {
      file.close();
      fs.unlink(dest, () => {}); // Delete the file async
      reject(err.message);
    });
  });
};

(async () => {
  for (const tool of tools) {
    const dest = path.join(LOGOS_DIR, `${tool.id}.png`);
    try {
      console.log(`Downloading logo for ${tool.id}...`);
      await downloadFile(tool.url, dest);
      console.log(`Successfully downloaded logo for ${tool.id}`);
    } catch (error) {
      console.error(`Failed to download logo for ${tool.id}:`, error);
    }
  }
})(); 