const { v4: uuidv4 } = require("uuid");

function getUUID() {
  return uuidv4();
}

function createUsersTable(db) {
  const createUserTable = `CREATE TABLE User ( 
        userID INTEGER NOT NULL UNIQUE, 
        name TEXT NOT NULL, 
        email TEXT NOT NULL UNIQUE, 
        password TEXT NOT NULL, 
        passwordItr INTEGER NOT NULL, 
        passwordSalt TEXT NOT NULL, 
        balance INTEGER DEFAULT 0, 
        PRIMARY KEY(userID AUTOINCREMENT) )`;
  db.exec(createUserTable);
}

module.exports = { getUUID, createUsersTable };
