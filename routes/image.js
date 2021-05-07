var express = require("express");
var router = express.Router();

const path = require("path");
const fs = require("fs").promises;
var http = require("http");
const multer = require("multer");
const upload = multer({ dest: "tempImages/" });

const imageHelper = require("../helpers/imageHelper");

router.post("/", upload.single("image"), async function (req, res, next) {
  try {
    const { isPublic, cost } = req.body;
    const user = req.currentUser;

    userParams = {
      userID: user.userID,
      isPublic: parseInt(isPublic),
      cost: parseFloat(cost),
    };
    const status = await imageHelper.processImage(req.file, userParams);
    console.log(status);
    res.send(status);
  } catch (err) {
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  res.set("Content-Type", "image/jpg");
  const file = await fs.readFile(
    "images/80277c6a-91f3-4ecb-b33b-1025c182795c.jpg"
  );

  // res.send(file);

  const files = [
    "images/80277c6a-91f3-4ecb-b33b-1025c182795c.jpg",
    "images/b65f0a85-9d68-4dba-bcb2-8c9319fa7d44.jpg",
  ];
  files.map(async (url) => {
    return await fs.readFile(url);
  });

  await Promise.all(files);
  res.send(files);
});

router.post("/bulk", upload.array("images"), async function (req, res, next) {
  try {
    let { isPublic, cost } = req.body;
    const user = req.currentUser;

    cost = JSON.parse(cost);

    userParams = {
      userID: user.userID,
      isPublic: parseInt(isPublic),
    };

    req.files.forEach(async (file, index) => {
      status = await imageHelper.processImage(file, {
        ...userParams,
        cost: cost[index],
      });
    });

    res.send("Files uploaded successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
