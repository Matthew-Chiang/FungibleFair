const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "tempImages/" });
const imageTable = require("../database/imageTable");
const tagTable = require("../database/tagTable");

const imageHelper = require("../helpers/imageHelper");

router.post("/", upload.single("image"), async function (req, res, next) {
  try {
    const { isPublic, name } = req.body;
    const user = req.currentUser;

    const tags = JSON.parse(req.body.tags);

    userParams = {
      userID: user.userID,
      isPublic: parseInt(isPublic),
      name,
    };
    const status = await imageHelper.processImage(req.file, userParams);

    tags.forEach((tag) => {
      tagTable.insertTag({ tagName: tag, imageID: status.lastInsertRowid });
    });

    res.send("File uploaded!");
  } catch (err) {
    next(err);
  }
});

router.post("/bulk", upload.array("images"), async function (req, res, next) {
  try {
    let { isPublic, name, tags } = req.body;
    const user = req.currentUser;

    isPublic = JSON.parse(isPublic);
    name = JSON.parse(name);
    tags = JSON.parse(tags);

    userParams = {
      userID: user.userID,
    };

    req.files.forEach(async (file, index) => {
      status = await imageHelper.processImage(file, {
        ...userParams,
        isPublic: isPublic[index],
        name: name[index],
      });

      tags[index].forEach((tag) => {
        tagTable.insertTag({ tagName: tag, imageID: status.lastInsertRowid });
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

router.get("/tag/:tagName", async function (req, res, next) {
  const { tagName } = req.params;
  const user = req.currentUser;

  const tags = tagTable.getTagByName({ tagName });
  const images = [];

  tags.forEach((tag) => {
    const image = imageTable.getImageByID({ imageID: tag.imageID });
    if (image.userID === user.userID) {
      images.push(image);
    }
  });
  imageHelper.sendImages(res, images);
});

router.get("/link/tag/:tagName", async function (req, res, next) {
  const { tagName } = req.params;
  const user = req.currentUser;

  const tags = tagTable.getTagByName({ tagName });
  const images = [];

  tags.forEach((tag) => {
    const image = imageTable.getImageByID({ imageID: tag.imageID });
    if (image.userID === user.userID) {
      images.push(image);
    }
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
