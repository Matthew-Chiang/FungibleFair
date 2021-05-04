//sqlite database
const sqlite3 = require("sqlite3").verbose();

let _db;


function initDB(callBack){
    if(_db){
        return callBack(null,_db)
    }

    _db = new sqlite3.Database(
        "./fungible.db",
        (err) => {
          if (err) {
            callBack(err,null)
          }
          console.log("Connected to the database.");
          callBack(null)
        }
      );
}

function getDB(){
    if(_db){
        return _db;
    }else{
        return null
    }
}


module.exports = {
    getDB,
    initDB
};