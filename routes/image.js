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
    const { isPublic, cost, name } = req.body;
    const user = req.currentUser;

    userParams = {
      userID: user.userID,
      isPublic: parseInt(isPublic),
      cost: parseFloat(cost),
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

router.post("/bulk", upload.array("images"), async function (req, res, next) {
  try {
    let { isPublic, cost, name } = req.body;
    const user = req.currentUser;

    cost = JSON.parse(cost);
    isPublic = JSON.parse(isPublic);
    name = JSON.parse(name);

    userParams = {
      userID: user.userID,
    };

    req.files.forEach(async (file, index) => {
      status = await imageHelper.processImage(file, {
        ...userParams,
        cost: cost[index],
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
