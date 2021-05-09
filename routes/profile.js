var express = require("express");
var router = express.Router();

const imageTable = require("../database/imageTable");

router.get("/", function (req, res, next) {
  const profile = {};

  const user = req.currentUser;

  profile.name = user.name;
  profile.email = user.email;

  const images = imageTable.getImageByUserID({ userID: user.userID });
  profile.numImages = images.length;

  res.send(profile);
});

module.exports = router;
