import fs from "fs";
import path from "path";
import { resize } from "./sharp";

const basePath = path.resolve(__dirname + "/photos");
const baseThumbnailPath = path.resolve(__dirname + "/thumbnail");

console.log(basePath, baseThumbnailPath);

const files = fs
  .readdirSync(basePath, { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .map((item) => item.name)
  .filter((item) => /\.(jpe?g|png)$/i.test(item));
//   .filter((item) => item == "0a8pZIkav8GDZrlfHr6HBOt8NCn96P9JLAvCrfuD.png");

(async () => {
  await resize(files, basePath, baseThumbnailPath);
  console.log("Done!!!");
})();
