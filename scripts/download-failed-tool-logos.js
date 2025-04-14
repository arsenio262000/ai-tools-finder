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
    id: 'oyster-hr',
    urls: [
      'https://assets.oysterhr.com/logo.png',
      'https://www.oysterhr.com/assets/images/logo.png',
      'https://ph-files.imgix.net/oyster-logo.png'
    ]
  },
  {
    id: 'survey-sparrow',
    urls: [
      'https://surveysparrow.com/wp-content/uploads/2023/logo.png',
      'https://assets.surveysparrow.com/logo/surveysparrow.png',
      'https://ph-files.imgix.net/surveysparrow-logo.png'
    ]
  },
  {
    id: 'yesware',
    urls: [
      'https://www.yesware.com/wp-content/themes/yesware/images/logo.png',
      'https://assets.yesware.com/images/yesware-logo.png',
      'https://ph-files.imgix.net/yesware-logo.png'
    ]
  },
  {
    id: 'shoeboxed',
    urls: [
      'https://www.shoeboxed.com/assets/images/logo-dark.png',
      'https://assets.shoeboxed.com/images/shoeboxed-logo.png',
      'https://ph-files.imgix.net/shoeboxed-logo.png'
    ]
  },
  {
    id: 'dext',
    urls: [
      'https://dext.com/assets/images/logo.png',
      'https://assets.dext.com/images/dext-logo.png',
      'https://ph-files.imgix.net/dext-logo.png'
    ]
  },
  {
    id: 'teja-ai',
    urls: [
      'https://teja.ai/logo.png',
      'https://assets.teja.ai/logo.png',
      'https://ph-files.imgix.net/teja-logo.png'
    ]
  },
  {
    id: 'ninja-chat-ai',
    urls: [
      'https://ninjachat.ai/logo.png',
      'https://assets.ninjachat.ai/logo.png',
      'https://ph-files.imgix.net/ninjachat-logo.png'
    ]
  },
  {
    id: 'onesec',
    urls: [
      'https://onesec.app/logo.png',
      'https://assets.onesec.app/logo.png',
      'https://ph-files.imgix.net/onesec-logo.png'
    ]
  },
  {
    id: 'virola',
    urls: [
      'https://virola.io/logo.png',
      'https://assets.virola.io/logo.png',
      'https://ph-files.imgix.net/virola-logo.png'
    ]
  },
  {
    id: 'daily-time-tracking',
    urls: [
      'https://dailytimetracking.com/logo.png',
      'https://assets.dailytimetracking.com/logo.png',
      'https://ph-files.imgix.net/dailytimetracking-logo.png'
    ]
  },
  {
    id: 'unibee',
    urls: [
      'https://unibee.io/logo.png',
      'https://assets.unibee.io/logo.png',
      'https://ph-files.imgix.net/unibee-logo.png'
    ]
  },
  {
    id: 'articial',
    urls: [
      'https://articial.io/logo.png',
      'https://assets.articial.io/logo.png',
      'https://ph-files.imgix.net/articial-logo.png'
    ]
  },
  {
    id: 'sigma-browser',
    urls: [
      'https://sigmabrowser.com/logo.png',
      'https://assets.sigmabrowser.com/logo.png',
      'https://ph-files.imgix.net/sigmabrowser-logo.png'
    ]
  },
  {
    id: 'flowmino',
    urls: [
      'https://flowmino.com/logo.png',
      'https://assets.flowmino.com/logo.png',
      'https://ph-files.imgix.net/flowmino-logo.png'
    ]
  },
  {
    id: 'maple',
    urls: [
      'https://maple.app/logo.png',
      'https://assets.maple.app/logo.png',
      'https://ph-files.imgix.net/maple-logo.png'
    ]
  },
  {
    id: 'outline',
    urls: [
      'https://www.getoutline.com/images/logo.png',
      'https://assets.getoutline.com/logo.png',
      'https://ph-files.imgix.net/outline-logo.png'
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
    
    // Skip if logo already exists and is not empty
    if (fs.existsSync(logoPath) && fs.statSync(logoPath).size > 0) {
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
      // Try Google Favicon API as last resort
      const domain = tool.id.replace(/-/g, '') + '.com';
      const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      try {
        await downloadFile(googleUrl, logoPath);
        console.log(`✓ Downloaded logo for ${tool.id} from Google Favicon API`);
      } catch (error) {
        console.error(`✗ Failed to download logo for ${tool.id} from all sources`);
      }
    }
  }
}

downloadLogos().catch(console.error); 