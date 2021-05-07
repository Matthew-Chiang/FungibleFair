var express = require("express");
var router = express.Router();

const path = require("path");
const fs = require("fs");
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
router.post("/bulk", upload.array("images"), async function (req, res, next) {
  try {
    let { isPublic, cost } = req.body;
    const user = req.currentUser;

    cost = JSON.parse(cost);

    userParams = {
      userID: user.userID,
      isPublic: parseInt(isPublic),
    };

    console.log(userParams);

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
