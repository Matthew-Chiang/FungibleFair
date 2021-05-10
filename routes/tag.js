var express = require("express");
var router = express.Router();
const tagTable = require("../database/tagTable");

router.put("/", function (req, res, next) {
  const { tagName, tagID } = req.body;

  const info = tagTable.updateTag({ tagName, tagID });
  res.send("Added/Updated tags");
});

router.get("/imageID/:imageID", function (req, res, next) {
  const { imageID } = req.params;

  const tags = tagTable.getTagByImage({ imageID });

  res.send(tags);
});

module.exports = router;
