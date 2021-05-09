const { getOrCreateDB } = require("./db");

const db = getOrCreateDB();

function insertImage(image) {
  /**
   * image object
   * userID: Int
   * pathName: string
   * public: boolean (optional) (1 or 0)
   */

  const { userID, pathName, isPublic, name } = image;

  let _db = db;
  if ("testingDB" in image) {
    _db = image.testingDB;
  }

  const stmt = _db.prepare(
    "INSERT INTO Image (pathName, isPublic, userID, name) VALUES (:pathName, :isPublic, :userID, :name)"
  );
  const info = stmt.run({
    pathName,
    isPublic,
    userID,
    name,
  });

  return info;
}

function getImageByUserID(imageQuery) {
  const { userID } = imageQuery;

  let _db = db;
  if ("testingDB" in imageQuery) {
    _db = imageQuery.testingDB;
  }

  const stmt = _db.prepare("SELECT * FROM Image WHERE userID = :userID");
  const image = stmt.all({
    userID,
  });
  return image;
}

function getImageByImageName(imageQuery) {
  const { userID, name } = imageQuery;

  let _db = db;
  if ("testingDB" in imageQuery) {
    _db = imageQuery.testingDB;
  }

  const stmt = _db.prepare(
    "SELECT * FROM Image WHERE userID = :userID AND name = :name"
  );
  const image = stmt.all({
    userID,
    name,
  });
  return image;
}

module.exports = {
  insertImage,
  getImageByUserID,
  getImageByImageName,
};
