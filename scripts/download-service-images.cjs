const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  { file: 'website-development.jpg', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { file: 'wordpress-development.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
  { file: 'ai-website-creation.jpg', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80' },
  { file: 'landing-pages.jpg', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { file: 'google-ads.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
  { file: 'meta-ads.jpg', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80' },
  { file: 'seo-local-seo.jpg', url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80' },
  { file: 'ecommerce.jpg', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80' },
  { file: 'ai-chatbot.jpg', url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80' },
  { file: 'website-management.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' }
];

const dir = path.join(__dirname, '../public/images/services');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const img of images) {
    console.log(`Downloading ${img.file}...`);
    try {
      await downloadImage(img.url, path.join(dir, img.file));
      console.log(`Done ${img.file}`);
    } catch (e) {
      console.error(`Failed ${img.file}:`, e.message);
    }
  }
}

run();
