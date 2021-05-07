var express = require("express");
var router = express.Router();

const imageTable = require("../database/imageTable");

/* GET home page. */
router.get("/", function (req, res, next) {
  const profile = {};

  profile.name = req.body.user.name;
  profile.email = req.body.user.email;
  profile.balance = req.body.user.balance;

  const images = imageTable.getImageByUserID({ userID: req.body.user.userID });
  profile.numImages = images.length;

  res.send(profile);
});

module.exports = router;
