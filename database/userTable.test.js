const userTable = require("./userTable");
const { initDB } = require("./db");

describe("Helper functions for Users Table", () => {
  beforeAll((done) => {
    return initDB(() => {
      done();
    });
  });

  test("Create User", (done) => {
    userTable
      .insertUser({
        name: "adsf",
        email: "dfs",
        password: "aw2erwe",
      })
      .then(() => {
        console.log("pass");
      })
      .catch((err) => {
        done.fail(new Error(err.message));
      });
  });
});
