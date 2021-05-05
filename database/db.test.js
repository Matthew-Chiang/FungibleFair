const { getOrCreateDB } = require("./db");

describe("Database connect and get functions", () => {
  test("connects to the database properly and retreives connection", (done) => {
    const db = getOrCreateDB();
    expect(db).not.toEqual(null);
    done();
  });
});
