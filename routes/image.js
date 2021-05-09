const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs").promises;
const http = require("http");
const zip = require("express-zip");
const multer = require("multer");
const upload = multer({ dest: "tempImages/" });
const imageTable = require("../database/imageTable");

const imageHelper = require("../helpers/imageHelper");

router.post("/", upload.single("image"), async function (req, res, next) {
  try {
    const { isPublic, name } = req.body;
    const user = req.currentUser;

    userParams = {
      userID: user.userID,
      isPublic: parseInt(isPublic),
      name,
    };
    const status = await imageHelper.processImage(req.file, userParams);
    console.log(status);
    res.send(status);
  } catch (err) {
    next(err);
  }
});

router.get("/:imageName", async function (req, res, next) {
  const { imageName } = req.params;
  const user = req.currentUser;

  const images = imageTable.getImageByImageName({
    userID: user.userID,
    name: imageName,
  });

  if (images.length == 1) {
    const path = images[0].pathName;
    res.set("Content-Type", "image/jpg");
    const file = await fs.readFile(path);
    res.send(file);
  } else {
    const zipParams = imageHelper.getPathAndNameForImages(images);
    res.zip(zipParams);
  }
});

router.get("/link/:imageName", function (req, res, next) {
  const { imageName } = req.params;
  const user = req.currentUser;

  const images = imageTable.getImageByImageName({
    userID: user.userID,
    name: imageName,
  });

  const serverURL = req.protocol + "://" + req.get("host");

  console.log(serverURL);

  const imageLinks = images.map((image) => {
    const urlSplitSlash = image.pathName.split("/");
    const fileName = urlSplitSlash[urlSplitSlash.length - 1];
    const fullUrl = serverURL + "/imageLink/" + fileName;

    return {
      image: fullUrl,
      name: image.name,
      isPublic: image.isPublic,
    };
  });

  res.send({ images: imageLinks });
});

router.post("/bulk", upload.array("images"), async function (req, res, next) {
  try {
    let { isPubli, name } = req.body;
    const user = req.currentUser;

    isPublic = JSON.parse(isPublic);
    name = JSON.parse(name);

    userParams = {
      userID: user.userID,
    };

    req.files.forEach(async (file, index) => {
      status = await imageHelper.processImage(file, {
        ...userParams,
        isPublic: isPublic[index],
        name: name[index],
      });
    });

    res.send("Files uploaded successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
