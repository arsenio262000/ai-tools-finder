const fs = require('fs');
const path = require('path');
const https = require('https');

const logoUrls = {
  'asana': 'https://logos-world.net/wp-content/uploads/2021/02/Asana-Logo.png',
  'trello': 'https://logos-world.net/wp-content/uploads/2021/02/Trello-Logo.png',
  'jira': 'https://logos-world.net/wp-content/uploads/2021/02/Jira-Logo.png',
  'basecamp': 'https://logos-world.net/wp-content/uploads/2021/02/Basecamp-Logo.png',
  'smartsheet': 'https://logos-world.net/wp-content/uploads/2021/02/Smartsheet-Logo.png',
  'wrike': 'https://logos-world.net/wp-content/uploads/2021/02/Wrike-Logo.png',
  'airtable': 'https://logos-world.net/wp-content/uploads/2021/02/Airtable-Logo.png'
};

const downloadLogo = (name, url) => {
  const logoDir = path.join(__dirname, '../public/logos');
  
  // Create logos directory if it doesn't exist
  if (!fs.existsSync(logoDir)) {
    fs.mkdirSync(logoDir, { recursive: true });
  }

  const filePath = path.join(logoDir, `${name}.png`);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`${name} logo already exists, skipping...`);
    return;
  }

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const file = fs.createWriteStream(filePath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${name} logo successfully`);
      });
    } else {
      console.error(`Failed to download ${name} logo. Status code: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${name} logo:`, err.message);
  });
};

// Download all logos
Object.entries(logoUrls).forEach(([name, url]) => {
  downloadLogo(name, url);
}); 