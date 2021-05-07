const crypto = require("crypto");

function getPasswordHash(password) {
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

  return {
    hashedPassword,
    passwordSalt: salt,
    passwordItr: passwordConfig.iterations,
  };
}

module.exports = { getPasswordHash };
