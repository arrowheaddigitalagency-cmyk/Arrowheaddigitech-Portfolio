const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const sites = [
  { id: 'dubai-tv-repair', url: 'https://www.dubaitvrepair.com' },
  { id: 'oj-properties', url: 'https://oj-properties.com' },
  { id: 'alwan-furniture', url: 'https://alwanfurniture.com' },
  { id: 'grow-dental', url: 'https://growdentalsupply.com' },
  { id: 'nova-med', url: 'https://novamedesthetics.com.au' },
];

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 ArrowheadBot' }, timeout: 25000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(new URL(res.headers.location, url).href).then(resolve, reject);
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 ArrowheadBot' }, timeout: 35000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try {
          fs.unlinkSync(dest);
        } catch {}
        return download(new URL(res.headers.location, url).href, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        reject(new Error('status ' + res.statusCode));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    });
    req.on('error', (e) => {
      try {
        fs.unlinkSync(dest);
      } catch {}
      reject(e);
    });
  });
}

function pickMeta(html, prop) {
  const re1 = new RegExp(`property=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`content=["']([^"']+)["'][^>]*property=["']${prop}["']`, 'i');
  const re3 = new RegExp(`name=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i');
  return (html.match(re1) || html.match(re2) || html.match(re3) || [])[1] || null;
}

(async () => {
  const results = [];
  for (const site of sites) {
    const dir = path.join('public/images/projects', site.id);
    fs.mkdirSync(dir, { recursive: true });
    try {
      const { status, data } = await fetchText(site.url);
      if (status >= 400) throw new Error('http ' + status);
      const og = pickMeta(data, 'og:image') || pickMeta(data, 'twitter:image');
      const iconMatch =
        data.match(/rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i) ||
        data.match(/href=["']([^"']+)["'][^>]*rel=["'](?:shortcut )?icon["']/i);
      const icon = (iconMatch && iconMatch[1]) || '/favicon.ico';
      const absOg = og ? new URL(og, site.url).href : null;
      const absIcon = new URL(icon, site.url).href;
      let desktop = null;
      let logo = null;
      if (absOg) {
        const dest = path.join(dir, 'desktop.jpg');
        try {
          await download(absOg, dest);
          desktop = dest;
        } catch (e) {
          console.log(site.id, 'og fail', e.message);
        }
      }
      try {
        const dest = path.join(dir, 'logo.png');
        await download(absIcon, dest);
        logo = dest;
      } catch (e) {
        console.log(site.id, 'icon fail', e.message);
      }
      results.push({
        id: site.id,
        status,
        title: pickMeta(data, 'og:title'),
        og: absOg,
        desktop: desktop && fs.existsSync(desktop),
        logo: logo && fs.existsSync(logo),
      });
    } catch (e) {
      results.push({ id: site.id, error: String(e.message || e) });
    }
  }
  console.log(JSON.stringify(results, null, 2));
})();
