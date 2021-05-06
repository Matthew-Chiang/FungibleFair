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
  const tags = stmt.all({
    tagName,
  });
  return tags;
}

function getTagByImage(tagQuery) {
  const { imageID } = tagQuery;

  let _db = db;
  if ("testingDB" in tagQuery) {
    _db = tagQuery.testingDB;
  }

  const stmt = _db.prepare("SELECT * FROM Tag WHERE imageID = :imageID");
  const tags = stmt.all({
    imageID,
  });
  return tags;
}

module.exports = {
  insertTag,
  getTagByName,
  getTagByImage,
};
