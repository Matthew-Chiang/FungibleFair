var express = require("express");
var router = express.Router();
const tagTable = require("../database/tagTable");

/* GET home page. */
router.get("/imageID/:imageID", function (req, res, next) {
    const { imageID } = req.params;

    const tags = tagTable.getTagByImage({ imageID });

    res.send(tags);
});

module.exports = router;
