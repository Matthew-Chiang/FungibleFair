const { getDB } = require("./database/db");

const db = getDB();

function insertUser(user) {
    /**
     * user object
     * name: Int
     * email: string
     * password: boolean (optional)
     */

    const { name, email, password } = options;

    const db = getDB();

    db.run("INSERT INTO User (name, email ) VALUES ($name, $email)", {
        name,
        email,
    });
}

module.exports = {
    insertUser,
};
