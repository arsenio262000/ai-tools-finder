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
    id: 'bolt',
    url: 'https://logo.clearbit.com/bolt.com'
  },
  {
    id: 'vercel',
    url: 'https://logo.clearbit.com/vercel.com'
  },
  {
    id: 'sketch',
    url: 'https://logo.clearbit.com/sketch.com'
  },
  {
    id: 'google-meet',
    url: 'https://logo.clearbit.com/meet.google.com'
  },
  {
    id: 'gamma-ai',
    url: 'https://logo.clearbit.com/gamma.ai'
  },
  {
    id: 'acqua-voice',
    url: 'https://logo.clearbit.com/acquavoice.com'
  },
  {
    id: 'resemble-ai',
    url: 'https://logo.clearbit.com/resemble.ai'
  },
  {
    id: 'habitkit',
    url: 'https://logo.clearbit.com/habitkit.app'
  },
  {
    id: 'teamup',
    url: 'https://logo.clearbit.com/teamup.com'
  },
  {
    id: 'receipts',
    url: 'https://logo.clearbit.com/receipts.app'
  },
  {
    id: 'goodtask',
    url: 'https://logo.clearbit.com/goodtaskapp.com'
  },
  {
    id: 'rytr-ai',
    url: 'https://logo.clearbit.com/rytr.me'
  },
  {
    id: 'constella-ai',
    url: 'https://logo.clearbit.com/constella.ai'
  },
  {
    id: 'claude',
    url: 'https://logo.clearbit.com/claude.ai'
  },
  {
    id: 'gemini',
    url: 'https://logo.clearbit.com/gemini.google.com'
  },
  {
    id: 'delphi',
    url: 'https://logo.clearbit.com/delphi.ai'
  },
  {
    id: 'oyster-hr',
    url: 'https://logo.clearbit.com/oysterhr.com'
  },
  {
    id: 'survey-sparrow',
    url: 'https://logo.clearbit.com/surveysparrow.com'
  },
  {
    id: 'yesware',
    url: 'https://logo.clearbit.com/yesware.com'
  },
  {
    id: 'shoeboxed',
    url: 'https://logo.clearbit.com/shoeboxed.com'
  },
  {
    id: 'dext',
    url: 'https://logo.clearbit.com/dext.com'
  },
  {
    id: 'teja-ai',
    url: 'https://logo.clearbit.com/teja.ai'
  },
  {
    id: 'ninja-chat-ai',
    url: 'https://logo.clearbit.com/ninjachat.ai'
  },
  {
    id: 'onesec',
    url: 'https://logo.clearbit.com/onesec.app'
  },
  {
    id: 'virola',
    url: 'https://logo.clearbit.com/virola.io'
  },
  {
    id: 'daily-time-tracking',
    url: 'https://logo.clearbit.com/dailytimetracking.com'
  },
  {
    id: 'unibee',
    url: 'https://logo.clearbit.com/unibee.io'
  },
  {
    id: 'articial',
    url: 'https://logo.clearbit.com/articial.io'
  },
  {
    id: 'sigma-browser',
    url: 'https://logo.clearbit.com/sigmabrowser.com'
  },
  {
    id: 'flowmino',
    url: 'https://logo.clearbit.com/flowmino.com'
  },
  {
    id: 'maple',
    url: 'https://logo.clearbit.com/maple.app'
  },
  {
    id: 'outline',
    url: 'https://logo.clearbit.com/outline.com'
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
        
        // Try Google Favicon API as fallback
        const domain = url.split('/').pop();
        const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        console.log(`Trying Google Favicon API for ${domain}...`);
        downloadFile(googleUrl, dest)
          .then(resolve)
          .catch(reject);
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

    try {
      await downloadFile(tool.url, logoPath);
      console.log(`✓ Downloaded logo for ${tool.id}`);
    } catch (error) {
      console.error(`✗ Failed to download logo for ${tool.id}: ${error}`);
    }
  }
}

downloadLogos().catch(console.error); 