//sqlite database
const Database = require("better-sqlite3");
var path = require("path");

let _db;

function getOrCreateDB(callBack) {
  if (_db) {
    return _db;
  }

  _db = new Database(path.join(__dirname, "fungible.db"), {});

  console.log("Connected to database");

  return _db;
}

module.exports = { getOrCreateDB };
