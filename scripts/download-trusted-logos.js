const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = [
  {
    name: 'zohd',
    url: 'https://example.com/zohd-logo.png' // Replace with actual URL
  },
  {
    name: 'clickup',
    url: 'https://example.com/clickup-logo.png' // Replace with actual URL
  },
  {
    name: 'superlist',
    url: 'https://example.com/superlist-logo.png' // Replace with actual URL
  },
  {
    name: 'setapp',
    url: 'https://example.com/setapp-logo.png' // Replace with actual URL
  },
  {
    name: 'akiflow',
    url: 'https://example.com/akiflow-logo.png' // Replace with actual URL
  },
  {
    name: 'morgen',
    url: 'https://example.com/morgen-logo.png' // Replace with actual URL
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

async function downloadLogos() {
  const publicDir = path.join(process.cwd(), 'public');
  
  for (const logo of logos) {
    const filepath = path.join(publicDir, `${logo.name}.png`);
    try {
      await downloadImage(logo.url, filepath);
      console.log(`Downloaded ${logo.name} logo successfully`);
    } catch (error) {
      console.error(`Error downloading ${logo.name} logo:`, error);
    }
  }
}

downloadLogos(); 