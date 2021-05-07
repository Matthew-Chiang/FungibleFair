const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const userTable = require("../database/userTable");

router.put("/", function (req, res, next) {
  // create user
  const { name, email, password } = req.body;

  const passwordConfig = {
    hashBytes: 32,
    saltBytes: 16,
    iterations: 100000,
  };

  const salt = crypto.randomBytes(passwordConfig.saltBytes).toString("base64");

  const hashedPassword = crypto
    .pbkdf2Sync(
      password,
      salt,
      passwordConfig.iterations,
      passwordConfig.hashBytes,
      "SHA512"
    )
    .toString("base64");
  let info;
  try {
    info = userTable.insertUser({
      name,
      email,
      password,
    });
  } catch (err) {
    throw err;
  }

  res.json({ info });
});

module.exports = router;
