import { mkdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const original = path.join(projectRoot, "public/maxim-kanochkin-hero-reference-clean.png");
const outputDirectory = path.join(projectRoot, "public/images");
await mkdir(outputDirectory, { recursive: true });

const metadata = await sharp(original).metadata();
const variants = [];
for (const width of [640, 960, 1370]) {
  const filename = `maxim-kanochkin-hero-${width}.webp`;
  const output = path.join(outputDirectory, filename);
  await sharp(original).rotate().resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 }).toFile(output);
  variants.push({ width, src: `/images/${filename}` });
  console.log(`${filename}: ${(await stat(output)).size} bytes`);
}

const manifest = {
  src: variants.at(-1).src,
  width: metadata.width,
  height: metadata.height,
  variants,
};
await writeFile(path.join(projectRoot, "lib/hero-image.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Original PNG: ${(await stat(original)).size} bytes`);
