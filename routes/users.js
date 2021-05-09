const express = require("express");
const router = express.Router();
const userTable = require("../database/userTable");
const userHelpers = require("../helpers/userHelpers");
const jwt = require("jsonwebtoken");

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

  if (loginUser) {
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
  } else {
    return res.status(401).send("Invalid email or password");
  }
});

router.delete("/logout", function (req, res, next) {
  const accessToken = req.cookies["jwt"];

  try {
    if (accessToken) {
      payload = userHelpers.verifyAccessToken(accessToken);
      res.clearCookie("jwt");
      res.send("Logged out successfully");
    } else {
      res.status(403).send("No JWT found");
    }
  } catch (err) {
    throw err;
  }
});

module.exports = router;
