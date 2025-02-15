import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const SIZES = {
  FAVICON: [16, 32],
  FAVICON_PNG: [16, 32],
  APPLE_TOUCH: [180],
  ANDROID_CHROME: [192, 512]
};

async function generateIcons() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const sourceImage = path.join(process.cwd(), 'src', 'assets', 'favicon-8.png');

    const faviconBuffer = await sharp(sourceImage)
      .resize(32, 32)
      .png()
      .toBuffer();
    await fs.writeFile(path.join(publicDir, 'favicon.ico'), faviconBuffer);
    console.log('✓ Generated favicon.ico');

    for (const size of SIZES.FAVICON_PNG) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
      console.log(`✓ Generated favicon-${size}x${size}.png`);
    }

    for (const size of SIZES.APPLE_TOUCH) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(publicDir, 'apple-touch-icon.png'));
      console.log('✓ Generated apple-touch-icon.png');
    }

    for (const size of SIZES.ANDROID_CHROME) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(publicDir, `android-chrome-${size}x${size}.png`));
      console.log(`✓ Generated android-chrome-${size}x${size}.png`);
    }

    console.log('\n🎉 All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 