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

router.post("/bulk", upload.array("images"), async function (req, res, next) {
  try {
    let { isPublic, name } = req.body;
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

router.get("/name/:imageName", async function (req, res, next) {
  const { imageName } = req.params;
  const user = req.currentUser;

  const images = imageTable.getImageByImageName({
    userID: user.userID,
    name: imageName,
  });
  imageHelper.sendImages(res, images);
});

router.get("/link/name/:imageName", function (req, res, next) {
  const { imageName } = req.params;
  const user = req.currentUser;

  const images = imageTable.getImageByImageName({
    userID: user.userID,
    name: imageName,
  });
  imageHelper.sendImageLinks(req, res, images);
});

router.get("/all", async function (req, res, next) {
  const user = req.currentUser;

  const images = imageTable.getImageByUserID({
    userID: user.userID,
  });

  imageHelper.sendImages(res, images);
});

router.get("/link/all", async function (req, res, next) {
  const user = req.currentUser;

  const images = imageTable.getImageByUserID({
    userID: user.userID,
  });

  imageHelper.sendImageLinks(req, res, images);
});

router.get("/public", async function (req, res, next) {
  const images = imageTable.getAllPublicImages({});

  imageHelper.sendImages(res, images);
});

router.get("/link/public", async function (req, res, next) {
  const images = imageTable.getAllPublicImages({});

  imageHelper.sendImageLinks(req, res, images);
});

router.delete("/id/:imageID", function (req, res, next) {
  const { imageID } = req.params;

  const image = imageTable.getImageByID({ imageID });
  if (image) {
    imageTable.deleteImageByID({ imageID });
    imageHelper.removeImageFile(image.pathName);
    res.send("Deleted image");
  } else {
    res.status(400).send("Invalid image id");
  }
});

module.exports = router;
