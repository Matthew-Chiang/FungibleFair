const path = require("path");
const { v4: uuidv4 } = require("uuid");
const imageTable = require("../database/imageTable");
const fs = require("fs").promises;
const zip = require("express-zip");

const acceptedFileExt = {
  ".apng": "image/apng",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpg": "image/jpg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg",
  ".webp": "image/webp",
};

async function processImage(file, userParams) {
  // renaming the downloaded file into the images folder
  const tempPath = file.path;
  const imageUUID = uuidv4();
  const extension = path.extname(file.originalname).toLowerCase();
  const targetPath = path.join(__dirname, `../images/${imageUUID}${extension}`);
  if (extension in acceptedFileExt) {
    try {
      await fs.rename(tempPath, targetPath);

      const info = imageTable.insertImage({
        pathName: targetPath,
        ...userParams,
      });

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
    const extension = "." + image.pathName.split(".").pop();

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
      const ext = "." + path.split(".").pop();
      console.log(ext);
      res.set("Content-Type", acceptedFileExt[ext]);
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
    const fileName = image.pathName.split("/").pop();
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
