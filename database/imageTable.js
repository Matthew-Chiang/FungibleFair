const { getDB } = require("./database/db");

function insertImage(options) {
  /**
   * options object
   * userID: Int
   * pathName: string
   * public: boolean (optional)
   * cost: double
   */

  const { userID, pathName, public, cost } = options;

  const db = getDB();

  db.run(
    "INSERT INTO Image (pathName, public, cost, userID) VALUES ($pathName, $public, $cost, $userID)",
    { pathName, public, cost, userID }
  );
}

module.exports = {
  insertImage,
};
