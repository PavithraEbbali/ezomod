// Generates the favicon / app-icon set from public/logo.png. Run: node scripts/generate-icons.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/logo.png";
const png = (size) => sharp(SRC).resize(size, size, { fit: "contain", background: "#FFFFFF" }).png().toBuffer();

/** ICO container holding PNG-encoded images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const [s16, s32, s48] = await Promise.all([png(16), png(32), png(48)]);
writeFileSync("app/favicon.ico", ico([{ size: 16, data: s16 }, { size: 32, data: s32 }, { size: 48, data: s48 }]));
writeFileSync("app/icon.png", await png(512));
writeFileSync("app/apple-icon.png", await png(180));
writeFileSync("public/icon-192.png", await png(192));
writeFileSync("public/icon-512.png", await png(512));
console.log("icons written");
