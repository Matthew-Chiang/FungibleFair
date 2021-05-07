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

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;

  const loginUser = userTable.getUserByEmail({ email });
  console.log(loginUser);

  const hashedPassword = userHelpers.hashPasswordWithSalt(
    password,
    loginUser.passwordSalt,
    loginUser.passwordItr
  );

  if (hashedPassword !== loginUser.password) {
    res.status(401).send("Invalid email or password");
  } else {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    const token = userHelpers.generateAccessToken(
      loginUser.userID,
      loginUser.email
    );

    res.cookie("jwt", token, {
      cookieOptions,
    });

    res.send("Successful Login");
  }
});

module.exports = router;
