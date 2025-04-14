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
    id: 'radiogpt',
    url: 'https://logo.clearbit.com/radiogpt.ai'
  },
  {
    id: 'radionewsai',
    url: 'https://logo.clearbit.com/radionewsai.com'
  },
  {
    id: 'raizer',
    url: 'https://logo.clearbit.com/raizer.io'
  },
  {
    id: 'ramadan-recipes',
    url: 'https://logo.clearbit.com/ramadanrecipes.ai'
  },
  {
    id: 'ramblefix',
    url: 'https://logo.clearbit.com/ramblefix.ai'
  },
  {
    id: 'recless',
    url: 'https://logo.clearbit.com/recless.studio'
  },
  {
    id: 'recapext',
    url: 'https://logo.clearbit.com/recapext.io'
  },
  {
    id: 'recast',
    url: 'https://logo.clearbit.com/recast.ai'
  },
  {
    id: 'receipt-ai',
    url: 'https://logo.clearbit.com/receiptai.app'
  },
  {
    id: 'receipt-cat',
    url: 'https://logo.clearbit.com/receiptcat.app'
  },
  {
    id: 'recipegpt',
    url: 'https://logo.clearbit.com/recipegpt.ai'
  },
  {
    id: 'recipes-by-ai',
    url: 'https://logo.clearbit.com/recipesbyai.com'
  },
  {
    id: 'recital',
    url: 'https://logo.clearbit.com/recital.ai'
  },
  {
    id: 'rightjoin',
    url: 'https://logo.clearbit.com/rightjoin.ai'
  },
  {
    id: 'riku-ai',
    url: 'https://logo.clearbit.com/riku.ai'
  },
  {
    id: 'ripx',
    url: 'https://logo.clearbit.com/ripx.io'
  },
  {
    id: 'rissun',
    url: 'https://logo.clearbit.com/rissun.com'
  },
  {
    id: 'rtutor',
    url: 'https://logo.clearbit.com/rtutor.ai'
  },
  {
    id: 'rubygpt',
    url: 'https://logo.clearbit.com/rubygpt.dev'
  },
  {
    id: 'runday-ai',
    url: 'https://logo.clearbit.com/runday.ai'
  },
  {
    id: 'rundiffusion',
    url: 'https://logo.clearbit.com/rundiffusion.ai'
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