const fs = require('fs');

try {
  const html = fs.readFileSync('public/favicon.html', 'utf8');
  // Look for data:image/png;base64,...
  const match = html.match(/src='data:image\/png;base64,([^']+)'/);
  if (match && match[1]) {
    const base64Data = match[1];
    fs.writeFileSync('public/favicon.png', base64Data, 'base64');
    console.log('Successfully extracted favicon.png');
  } else {
    console.log('Could not find base64 image data in favicon.html');
  }
} catch (e) {
  console.error(e);
}
