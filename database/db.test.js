const { getDB, initDB } = require("./db");

describe("Database connect and get functions", () => {
  test("connects to the database properly and retreives connection", (done) => {
    initDB(() => {
      const db = getDB();
      expect(db).not.toEqual(null);
      done();
    });
  });
});
