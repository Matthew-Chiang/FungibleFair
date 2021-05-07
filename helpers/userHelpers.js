const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const keys = require("../keys");

const passwordConfig = {
  hashBytes: 32,
  saltBytes: 16,
  iterations: 100000,
};

function getPasswordHash(password) {
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

  return {
    hashedPassword,
    passwordSalt: salt,
    passwordItr: passwordConfig.iterations,
  };
}

function hashPasswordWithSalt(password, salt, iterations) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, passwordConfig.hashBytes, "SHA512")
    .toString("base64");
  return hashedPassword;
}

function generateAccessToken(userID, email) {
  const payload = { userID, email };

  const accessToken = jwt.sign(payload, keys.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: 86400,
  });
  return accessToken;
}

function verifyAccessToken(token) {
  const payload = jwt.verify(token, keys.ACCESS_TOKEN_SECRET);
  return payload;
}

module.exports = {
  getPasswordHash,
  hashPasswordWithSalt,
  generateAccessToken,
  verifyAccessToken,
};
