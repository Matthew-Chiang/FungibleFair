const { v4: uuidv4 } = require("uuid");
const userTable = require("../database/userTable");
const imageTable = require("../database/imageTable");

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

function insertUser(db, id) {
  const info = userTable.insertUser({
    name: "name-" + id,
    email: id + "@shopify.com",
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

function createImageUserIDIndex(db) {
  const createImageUserIDIndex = `CREATE INDEX "ImageByUserID" ON "Image" ( "userID" )`;
  db.exec(createImageUserIDIndex);
}

function insertImage(db, id) {
  const info = imageTable.insertImage({
    pathName: "/images/testImage" + id,
    isPublic: 0,
    cost: 14.99,
    userID: 1,
    testingDB: db,
  });
}

function createTagTable(db) {
  const createTagTable = `CREATE TABLE "Tag" ( 
      "tagID" INTEGER NOT NULL UNIQUE, 
      "tagName" TEXT NOT NULL, 
      "imageID" INTEGER NOT NULL, 
      PRIMARY KEY("tagID" AUTOINCREMENT), 
      FOREIGN KEY("imageID") REFERENCES "Image"("imageID") )`;
  db.exec(createTagTable);
}

function createTagNameIndex(db) {
  const createTagNameIndex = `CREATE INDEX "TagName" ON "Tag" ( "tagName" )`;
  db.exec(createTagNameIndex);
}

module.exports = {
  getUUID,
  createUserTable,
  createEmailIndex,
  insertUser,
  createImageTable,
  createImageUserIDIndex,
  insertImage,
  createTagTable,
  createTagNameIndex,
};
