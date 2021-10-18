import imageThumbnail from "image-thumbnail";
import fs from "fs";
const imageExtensions: string[] = [
  ".bmp",
  ".exif",
  ".gif",
  ".ico",
  ".iff",
  ".jng",
  ".jpeg",
  ".jpg",
  ".raw",
  ".sgi",
  ".svg",
  ".png",
  ".webp",
  ".iff",
  ".rgb",
  ".rgba",
];

export async function checkIsImage(ext: string): Promise<boolean> {
  for await (const e of imageExtensions) {
    if (e === ext) return true;
  }
  return false;
}

export async function proxyImage(bufferOriginal: any): Promise<Buffer> {
  const bufferThumbnail: Buffer = await imageThumbnail(bufferOriginal);
  return bufferThumbnail;
}
/**
 * Toma un file, donde viene el buffer y el nombreoriginal para guardarlo.
 * @param file
 */
export async function saveImage(file: any, path: string) {
  const pathFile: string = path + file.originalname;
  fs.writeFile(pathFile, file.buffer, () =>
    console.log("Imagen guardada en ", pathFile)
  );
}
