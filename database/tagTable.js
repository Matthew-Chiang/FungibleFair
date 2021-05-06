const { getOrCreateDB } = require("./db");

const db = getOrCreateDB();

function insertTag(tag) {
  /**
   * tag object
   * tagName: string
   * imageID: int
   */

  const { tagName, imageID } = tag;

  let _db = db;
  if ("testingDB" in tag) {
    _db = tag.testingDB;
  }

  const stmt = _db.prepare(
    "INSERT INTO Tag (tagName, imageID) VALUES (:tagName, :imageID)"
  );
  const info = stmt.run({
    tagName,
    imageID,
  });

  return info;
}

module.exports = {
  insertTag,
};
