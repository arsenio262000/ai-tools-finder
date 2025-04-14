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
    id: 'workdone',
    urls: [
      'https://workdone.app/apple-touch-icon.png',
      'https://workdone.app/favicon.ico'
    ]
  },
  {
    id: 'flowlance',
    urls: [
      'https://flowlance.app/apple-touch-icon.png',
      'https://flowlance.app/favicon.ico'
    ]
  },
  {
    id: 'teemyco',
    urls: [
      'https://teemyco.com/apple-touch-icon.png',
      'https://teemyco.com/favicon.ico'
    ]
  },
  {
    id: 'simple-habit',
    urls: [
      'https://www.simplehabit.com/apple-touch-icon.png',
      'https://www.simplehabit.com/favicon.ico'
    ]
  },
  {
    id: 'clearooms',
    urls: [
      'https://clearooms.com/apple-touch-icon.png',
      'https://clearooms.com/favicon.ico'
    ]
  },
  {
    id: 'hive',
    urls: [
      'https://hive.com/apple-touch-icon.png',
      'https://hive.com/favicon.ico'
    ]
  },
  {
    id: 'mailspring',
    urls: [
      'https://getmailspring.com/apple-touch-icon.png',
      'https://getmailspring.com/favicon.ico'
    ]
  },
  {
    id: 'fitmind',
    urls: [
      'https://fitmind.co/apple-touch-icon.png',
      'https://fitmind.co/favicon.ico'
    ]
  },
  {
    id: 'zoho-books',
    urls: [
      'https://www.zoho.com/books/apple-touch-icon.png',
      'https://www.zoho.com/books/favicon.ico'
    ]
  },
  {
    id: 'notejoy',
    urls: [
      'https://notejoy.com/apple-touch-icon.png',
      'https://notejoy.com/favicon.ico'
    ]
  },
  {
    id: 'noteful',
    urls: [
      'https://noteful.app/apple-touch-icon.png',
      'https://noteful.app/favicon.ico'
    ]
  },
  {
    id: 'timetree',
    urls: [
      'https://timetreeapp.com/apple-touch-icon.png',
      'https://timetreeapp.com/favicon.ico'
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