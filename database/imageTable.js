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

function getImageByUserID(imageQuery) {
    const { userID } = imageQuery;

    let _db = db;
    if ("testingDB" in imageQuery) {
        _db = imageQuery.testingDB;
    }

    const stmt = _db.prepare("SELECT * FROM Image WHERE userID = :userID");
    const image = stmt.get({
        userID,
    });
    return image;
}

module.exports = {
    insertImage,
    getImageByUserID,
};
