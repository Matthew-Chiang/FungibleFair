var express = require("express");
var router = express.Router();

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "tempImages/" });

const imageHelper = require("../helpers/imageHelper");

router.post("/", upload.single("test"), async function (req, res, next) {
  try {
    const { isPublic, cost } = req.body;
    const user = req.currentUser;
    console.log(req.body);
    console.log(user);
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

module.exports = router;
