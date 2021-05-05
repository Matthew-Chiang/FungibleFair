const { getOrCreateDB } = require("./db");

const db = getOrCreateDB();

function insertImage(image) {
  /**
   * image object
   * userID: Int
   * pathName: string
   * public: boolean (optional) (1 or 0)
   * cost: double
   */

  const { userID, pathName, isPublic, cost } = image;

  let _db = db;
  if ("testingDB" in image) {
    _db = image.testingDB;
  }

  const stmt = _db.prepare(
    "INSERT INTO Image (pathName, isPublic, cost, userID) VALUES (:pathName, :isPublic, :cost, :userID)"
  );
  const info = stmt.run({
    pathName,
    isPublic,
    cost,
    userID,
  });

  return info;
}

module.exports = {
  insertImage,
};
