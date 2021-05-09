const path = require("path");
const { v4: uuidv4 } = require("uuid");
const imageTable = require("../database/imageTable");
const fs = require("fs").promises;

async function processImage(file, userParams) {
  // renaming the downloaded file into the images folder
  const tempPath = file.path;
  const imageUUID = uuidv4();
  const targetPath = path.join(__dirname, `../images/${imageUUID}.jpg`);
  if (path.extname(file.originalname).toLowerCase() === ".jpg") {
    try {
      await fs.rename(tempPath, targetPath);

      const info = imageTable.insertImage({
        pathName: targetPath,
        ...userParams,
      });

      console.log(info);

      return info;
    } catch (err) {
      throw err;
    }
  } else {
    try {
      await fs.unlink(tempPath);
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

async function sendImages(res, images) {
  if (images.length == 1) {
    try {
      const path = images[0].pathName;
      res.set("Content-Type", "image/jpg");
      const file = await fs.readFile(path);
      res.send(file);
    } catch (err) {
      throw err;
    }
  } else {
    const zipParams = getPathAndNameForImages(images);
    res.zip(zipParams);
  }
}

async function sendImageLinks(req, res, images) {
  const serverURL = req.protocol + "://" + req.get("host");

  const imageLinks = images.map((image) => {
    const urlSplitSlash = image.pathName.split("/");
    const fileName = urlSplitSlash[urlSplitSlash.length - 1];
    const fullUrl = serverURL + "/imageLink/" + fileName;

    return {
      id: image.imageID,
      image: fullUrl,
      name: image.name,
      isPublic: image.isPublic,
    };
  });

  res.send({ images: imageLinks });
}

async function removeImageFile(path) {
  try {
    await fs.unlink(path);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  processImage,
  getPathAndNameForImages,
  sendImages,
  sendImageLinks,
  removeImageFile,
};
