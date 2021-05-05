const userTable = require("./userTable");
const Database = require("better-sqlite3");
const TestingHelpers = require("../testing_helpers/db_testing_helpers");

describe("Helper functions for Users Table", () => {
  let testingDB;
  beforeEach(() => {
    testingDB = new Database(":memory:", {});
    TestingHelpers.createUsersTable(testingDB);
  });

  test("Create User", () => {
    const userUUID = TestingHelpers.getUUID();
    const info = userTable.insertUser({
      name: "name-" + userUUID,
      email: userUUID + "@shopify.com",
      password: "password1",
      testingDB,
    });

    expect(info.changes).toEqual(1);
  });
});
