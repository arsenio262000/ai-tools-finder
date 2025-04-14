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
    id: 'saam',
    url: 'https://logo.clearbit.com/saam.ai'
  },
  {
    id: 'saasydb',
    url: 'https://logo.clearbit.com/saasydb.com'
  },
  {
    id: 'safebet',
    url: 'https://logo.clearbit.com/safebet.ai'
  },
  {
    id: 'safespelling',
    url: 'https://logo.clearbit.com/safespelling.ai'
  },
  {
    id: 'sales-stack',
    url: 'https://logo.clearbit.com/salesstack.io'
  },
  {
    id: 'sales-zen',
    url: 'https://logo.clearbit.com/saleszen.app'
  },
  {
    id: 'salesboom-ai',
    url: 'https://logo.clearbit.com/salesboom.ai'
  },
  {
    id: 'salesforge',
    url: 'https://logo.clearbit.com/salesforge.io'
  },
  {
    id: 'salesgpt',
    url: 'https://logo.clearbit.com/salesgpt.ai'
  },
  {
    id: 'salesmind-ai',
    url: 'https://logo.clearbit.com/salesmind.ai'
  },
  {
    id: 'scale',
    url: 'https://logo.clearbit.com/scale.com'
  },
  {
    id: 'scalenut',
    url: 'https://logo.clearbit.com/scalenut.com'
  },
  {
    id: 'scanboy',
    url: 'https://logo.clearbit.com/scanboy.app'
  },
  {
    id: 'scannergo',
    url: 'https://logo.clearbit.com/scannergo.com'
  },
  {
    id: 'secretary-gpt',
    url: 'https://logo.clearbit.com/secretarygpt.ai'
  },
  {
    id: 'secureframe',
    url: 'https://logo.clearbit.com/secureframe.com'
  },
  {
    id: 'seek',
    url: 'https://logo.clearbit.com/seek.ai'
  },
  {
    id: 'seo-ai',
    url: 'https://logo.clearbit.com/seo.ai'
  },
  {
    id: 'seo-app',
    url: 'https://logo.clearbit.com/seo.app'
  },
  {
    id: 'soap-note-ai',
    url: 'https://logo.clearbit.com/soapnoteai.com'
  },
  {
    id: 'social-gpt',
    url: 'https://logo.clearbit.com/socialgpt.ai'
  },
  {
    id: 'social-intents',
    url: 'https://logo.clearbit.com/socialintents.com'
  },
  {
    id: 'social-magic',
    url: 'https://logo.clearbit.com/socialmagic.ai'
  },
  {
    id: 'storywiz',
    url: 'https://logo.clearbit.com/storywiz.ai'
  },
  {
    id: 'storywizard',
    url: 'https://logo.clearbit.com/storywizard.com'
  },
  {
    id: 'straico',
    url: 'https://logo.clearbit.com/straico.ai'
  },
  {
    id: 'stratup-ai',
    url: 'https://logo.clearbit.com/stratup.ai'
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