const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const sourcePath = path.join(__dirname, '../public/arrowhead-mark.png');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(sourcePath)) {
    console.error('Source image not found:', sourcePath);
    return;
  }

  try {
    // Generate favicon-16x16.png
    await sharp(sourcePath)
      .resize(16, 16)
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('Generated favicon-16x16.png');

    // Generate favicon-32x32.png
    await sharp(sourcePath)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('Generated favicon-32x32.png');

    // Generate apple-touch-icon.png
    await sharp(sourcePath)
      .resize(180, 180)
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');

    // Generate favicon.ico (just copying the 32x32 one, it's widely supported as .ico)
    fs.copyFileSync(
      path.join(publicDir, 'favicon-32x32.png'),
      path.join(publicDir, 'favicon.ico')
    );
    console.log('Generated favicon.ico');

  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
