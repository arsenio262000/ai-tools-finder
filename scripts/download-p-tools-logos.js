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
    id: 'pdf-ai',
    url: 'https://pdf.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/pdf.png'
  },
  {
    id: 'pdfpals',
    url: 'https://pdfpals.com/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/pdf-2.png'
  },
  {
    id: 'peach',
    url: 'https://peach.app/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/peach.png'
  },
  {
    id: 'peachly-ai',
    url: 'https://peachly.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/artificial-intelligence.png'
  },
  {
    id: 'peakgpt',
    url: 'https://peakgpt.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/chatgpt.png'
  },
  {
    id: 'pebbley',
    url: 'https://pebbley.com/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/design.png'
  },
  {
    id: 'peech',
    url: 'https://peech.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/video.png'
  },
  {
    id: 'peek-ai',
    url: 'https://peek.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/search.png'
  },
  {
    id: 'pencil',
    url: 'https://pencil.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/pencil.png'
  },
  {
    id: 'people-ai',
    url: 'https://people.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/team-skin-type-7.png'
  },
  {
    id: 'peppertype',
    url: 'https://peppertype.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/content.png'
  },
  {
    id: 'perceptif',
    url: 'https://perceptif.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/visible.png'
  },
  {
    id: 'percy-lab',
    url: 'https://percy.io/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/test-tube.png'
  },
  {
    id: 'perfai',
    url: 'https://perfai.com/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/performance.png'
  },
  {
    id: 'perfectesse',
    url: 'https://perfectesse.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/edit-text-file.png'
  },
  {
    id: 'perfectly-clear',
    url: 'https://perfectlyclear.com/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/image.png'
  },
  {
    id: 'permar-ai',
    url: 'https://permar.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/commercial-development-management.png'
  },
  {
    id: 'perpend',
    url: 'https://perpend.ai/logo.png',
    fallbackUrl: 'https://img.icons8.com/color/96/decision.png'
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

    try {
      // Try to download the primary logo
      await downloadFile(tool.url, logoPath);
      console.log(`✓ Downloaded logo for ${tool.id}`);
    } catch (error) {
      console.log(`⚠ Primary logo failed for ${tool.id}, trying fallback...`);
      try {
        // If primary fails, try the fallback
        await downloadFile(tool.fallbackUrl, logoPath);
        console.log(`✓ Downloaded fallback logo for ${tool.id}`);
      } catch (fallbackError) {
        console.error(`✗ Failed to download both primary and fallback logos for ${tool.id}`);
      }
    }
  }
}

downloadLogos().catch(console.error); 