const path = require("path");
const { v4: uuidv4 } = require("uuid");
const imageTable = require("../database/imageTable");
const { rename, unlink } = require("fs").promises;
const fs = require("fs");

async function processImage(file, userParams) {
  // renaming the downloaded file into the images folder
  const tempPath = file.path;
  const imageUUID = uuidv4();
  const targetPath = path.join(__dirname, `../images/${imageUUID}.jpg`);
  if (path.extname(file.originalname).toLowerCase() === ".jpg") {
    try {
      await rename(tempPath, targetPath);

      const info = imageTable.insertImage({
        pathName: targetPath,
        ...userParams,
      });

      return "File uploaded!";
    } catch (err) {
      throw err;
    }
  } else {
    try {
      await unlink(tempPath);
      throw new Error("Invalid file types uploaded");
    } catch (err) {
      throw err;
    }
  }
}

function getPathAndNameForImages(images) {
  fileNames = {};
  const zipParams = images.map((image) => {
    const urlSplitByDot = image.pathName.split(".");
    const extension = "." + urlSplitByDot[urlSplitByDot.length - 1];

    let fileName;
    if (image.name in fileNames) {
      fileNames[image.name]++;
      fileName = image.name + fileNames[image.name];
    } else {
      fileName = image.name;
      fileNames[image.name] = 1;
    }
    return { path: image.pathName, name: fileName + extension };
  });
  return zipParams;
}

module.exports = { processImage, getPathAndNameForImages };
