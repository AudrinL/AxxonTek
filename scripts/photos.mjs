/**
 * Optimise photos for the web.
 *
 *   npm run photos
 *
 * Reads every .jpg/.jpeg/.png/.heic in public/assets/photos, writes a
 * same-named .webp beside it (max 1800px on the long edge, quality 80,
 * metadata stripped — phone photos carry GPS data). Existing .webp files
 * are skipped unless the source is newer, so it is safe to re-run.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/assets/photos");
const SOURCES = new Set([".jpg", ".jpeg", ".png", ".heic", ".heif", ".tif", ".tiff"]);
const MAX_EDGE = 1800;

const files = await readdir(dir);
let done = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!SOURCES.has(ext)) continue;

  const src = path.join(dir, file);
  const out = path.join(dir, `${path.basename(file, ext)}.webp`);

  const srcStat = await stat(src);
  const outStat = await stat(out).catch(() => null);
  if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
    console.log(`skip  ${file} (up to date)`);
    continue;
  }

  const image = sharp(src).rotate(); // honour EXIF orientation, then strip it
  const meta = await image.metadata();
  const info = await image
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(out);

  const before = (srcStat.size / 1024).toFixed(0);
  const after = (info.size / 1024).toFixed(0);
  console.log(
    `ok    ${file} ${meta.width}x${meta.height} ${before}KB -> ${path.basename(out)} ${info.width}x${info.height} ${after}KB`,
  );
  done++;
}

console.log(done ? `\n${done} photo(s) written. Now point the slots in lib/site.ts at them.` : "\nNothing to do.");
