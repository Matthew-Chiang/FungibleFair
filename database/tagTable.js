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

function getTagByName(tagQuery) {
  const { tagName } = tagQuery;

  let _db = db;
  if ("testingDB" in tagQuery) {
    _db = tagQuery.testingDB;
  }

  const stmt = _db.prepare("SELECT * FROM Tag WHERE tagName = :tagName");
  const image = stmt.all({
    tagName,
  });
  return image;
}

module.exports = {
  insertTag,
  getTagByName,
};
