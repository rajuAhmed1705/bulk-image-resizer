import fs from "fs";
import sharp from "sharp";

export const resize = async (
  files: Array<string>,
  basePath: string,
  baseThumbnailPath: string
) => {
  let count = 0;
  for await (const file of files) {
    const buff = fs.readFileSync(basePath + "/" + file);
    const thumbnailImagePath = baseThumbnailPath + "/" + file;

    if (!fs.existsSync(thumbnailImagePath)) {
      const image = sharp(buff);
      const metadata = await image.metadata();
      const size = metadata.size && metadata.size / 1000;
      const width = metadata.width;

      let resizedBuff: Buffer;

      if (width && width > 300 && size && size > 100) {
        resizedBuff = await image.resize({ width: 300 }).toBuffer();
      } else {
        resizedBuff = await image.toBuffer();
      }

      fs.writeFileSync(thumbnailImagePath, resizedBuff, {
        flag: "w",
      });

      const newBuff = fs.readFileSync(thumbnailImagePath);
      const newImage = sharp(newBuff);
      const newImageMetadata = await newImage.metadata();
      console.log({
        file,
        size,
        width,
        newSize: newImageMetadata.size && newImageMetadata.size / 1000,
        newWidth: newImageMetadata.width,
        count: count++,
      });
    } else {
      console.log("file exist");
      count++;
    }
  }
};
