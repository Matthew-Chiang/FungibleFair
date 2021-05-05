const crypto = require("crypto");
const { getDB } = require("./db");

const db = getDB();

function insertUser(user, callBack) {
  /**
   * user object
   * name: string
   * email: string
   * password: string
   */

  return new Promise((resolve, reject) => {
    const { name, email, password } = user;

    const passwordConfig = {
      hashBytes: 32,
      saltBytes: 16,
      iterations: 100000,
    };

    const salt = crypto
      .randomBytes(passwordConfig.saltBytes)
      .toString("base64");

    const hashedPassword = crypto
      .pbkdf2Sync(
        password,
        salt,
        passwordConfig.iterations,
        passwordConfig.hashBytes,
        "SHA512"
      )
      .toString("base64");

    console.log(hashedPassword);

    const db = getDB();

    db.run(
      "INSERT INTO User (name, email, password, passwordItr, passwordSalt) VALUES ($name, $email, $password, $passwordItr, $passwordSalt)",
      {
        $name: name,
        $email: email,
        $password: hashedPassword,
        $passwordItr: passwordConfig.iterations,
        $passwordSalt: salt,
      },
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(this.changes);
          resolve();
        }
      }
    );
  });
}

module.exports = {
  insertUser,
};
