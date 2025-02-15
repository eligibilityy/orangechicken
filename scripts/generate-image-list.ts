import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES_DIR = join(process.cwd(), 'public/images');
const OUTPUT_FILE = join(process.cwd(), 'src/generated/image-list.ts');

const generateImageList = () => {
  const images = readdirSync(PUBLIC_IMAGES_DIR)
    .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
    .map(file => `/images/${file}`);

  const fileContent = `export const imageList = ${JSON.stringify(images, null, 2)};`;

  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, fileContent);
  console.log('✅ Generated image list');
};

generateImageList(); 