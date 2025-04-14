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
    id: 'query-kitty',
    url: 'https://logo.clearbit.com/querykitty.com'
  },
  {
    id: 'query-vary',
    url: 'https://logo.clearbit.com/queryvary.tech'
  },
  {
    id: 'quest',
    url: 'https://logo.clearbit.com/quest.app'
  },
  {
    id: 'questflow',
    url: 'https://logo.clearbit.com/questflow.io'
  },
  {
    id: 'questgen',
    url: 'https://logo.clearbit.com/questgen.ai'
  },
  {
    id: 'question-n',
    url: 'https://logo.clearbit.com/questionn.ai'
  },
  {
    id: 'question-yi',
    url: 'https://logo.clearbit.com/questionyi.com'
  },
  {
    id: 'questionaire',
    url: 'https://logo.clearbit.com/questionaire.com'
  },
  {
    id: 'questionbe',
    url: 'https://logo.clearbit.com/questionbe.com'
  },
  {
    id: 'quetab',
    url: 'https://logo.clearbit.com/quetab.com'
  },
  {
    id: 'quick-creat',
    url: 'https://logo.clearbit.com/quickcreat.app'
  },
  {
    id: 'quick-mvp',
    url: 'https://logo.clearbit.com/quickmvp.dev'
  },
  {
    id: 'quick-repli',
    url: 'https://logo.clearbit.com/quickrepli.ai'
  },
  {
    id: 'quickbook-a',
    url: 'https://logo.clearbit.com/quickbooka.ai'
  },
  {
    id: 'quickchat',
    url: 'https://logo.clearbit.com/quickchat.ai'
  },
  {
    id: 'quickeee',
    url: 'https://logo.clearbit.com/quickeee.com'
  },
  {
    id: 'quickie',
    url: 'https://logo.clearbit.com/quickie.app'
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