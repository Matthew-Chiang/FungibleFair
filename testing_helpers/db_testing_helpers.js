const { v4: uuidv4 } = require("uuid");
const userTable = require("../database/userTable");

function getUUID() {
  return uuidv4();
}

function createUserTable(db) {
  const createUserTable = `CREATE TABLE "User" ( 
      "userID" INTEGER NOT NULL UNIQUE, 
      "name" TEXT NOT NULL, 
      "email" TEXT NOT NULL UNIQUE, 
      "password" TEXT NOT NULL, 
      "passwordItr" INTEGER NOT NULL, 
      "passwordSalt" TEXT NOT NULL, 
      "balance" INTEGER DEFAULT 0, 
      PRIMARY KEY("userID" AUTOINCREMENT) )`;
  db.exec(createUserTable);
}

function createEmailIndex(db) {
  const createEmailIndex = `CREATE INDEX "Email" ON "User" ( "email" )`;
  db.exec(createEmailIndex);
}

function insertUser(db, userUUID) {
  const info = userTable.insertUser({
    name: "name-" + userUUID,
    email: userUUID + "@shopify.com",
    password: "password1",
    testingDB: db,
  });
}

function createImageTable(db) {
  const createImageTable = `CREATE TABLE "Image" (
        "imageID"	INTEGER NOT NULL UNIQUE,
        "pathName"	TEXT NOT NULL,
        "isPublic"	INTEGER,
        "userID"	INTEGER NOT NULL,
        "cost"	REAL,
        PRIMARY KEY("imageID" AUTOINCREMENT),
        FOREIGN KEY("userID") REFERENCES "User"("userID")
    )`;
  db.exec(createImageTable);
}

module.exports = {
  getUUID,
  createUserTable,
  createEmailIndex,
  insertUser,
  createImageTable,
};
