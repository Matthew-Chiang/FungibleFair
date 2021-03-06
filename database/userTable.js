const { getOrCreateDB } = require("./db");

const db = getOrCreateDB();

function insertUser(user) {
  /**
   * user object
   * name: string
   * email: string
   * password: string
   * testingDB: DB Object
   */

  const { name, email, hashedPassword, passwordItr, passwordSalt } = user;

  let _db = db;
  if ("testingDB" in user) {
    _db = user.testingDB;
  }

  const stmt = _db.prepare(
    "INSERT INTO User (name, email, password, passwordItr, passwordSalt) VALUES (:name, :email, :password, :passwordItr, :passwordSalt)"
  );

  const info = stmt.run({
    name: name,
    email: email,
    password: hashedPassword,
    passwordItr: passwordItr,
    passwordSalt: passwordSalt,
  });

  return info;
}

function getUserByID(userQuery) {
  const { userID } = userQuery;

  let _db = db;
  if ("testingDB" in userQuery) {
    _db = userQuery.testingDB;
  }

  const stmt = _db.prepare("SELECT * FROM User WHERE userID = :userID");
  const user = stmt.get({
    userID,
  });
  return user;
}

function getUserByEmail(userQuery) {
  const { email } = userQuery;

  let _db = db;
  if ("testingDB" in userQuery) {
    _db = userQuery.testingDB;
  }

  const stmt = _db.prepare("SELECT * FROM User WHERE email = :email");
  const user = stmt.get({
    email,
  });

  return user;
}

module.exports = {
  insertUser,
  getUserByID,
  getUserByEmail,
};
