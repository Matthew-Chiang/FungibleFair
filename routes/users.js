const express = require("express");
const router = express.Router();
const userTable = require("../database/userTable");
const userHelpers = require("../helpers/userHelpers");

router.put("/", function (req, res, next) {
  // create user
  const { name, email, password } = req.body;

  const passwordInfo = userHelpers.getPasswordHash(password);

  let info;
  try {
    info = userTable.insertUser({
      name,
      email,
      ...passwordInfo,
    });
  } catch (err) {
    throw err;
  }

  res.json({ info });
});

module.exports = router;
