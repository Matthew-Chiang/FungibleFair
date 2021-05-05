const userTable = require("./userTable");
const Database = require("better-sqlite3");
const TestingHelpers = require("../testing_helpers/db_testing_helpers");

describe("Helper functions for Users Table", () => {
  let testingDB;
  beforeEach(() => {
    testingDB = new Database(":memory:", {});
    TestingHelpers.createUserTable(testingDB);
    TestingHelpers.createEmailIndex(testingDB);
  });

  afterEach(() => {
    testingDB.close();
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

  describe("Get User Tests", () => {
    const userUUID = TestingHelpers.getUUID();
    beforeEach(() => {
      TestingHelpers.insertUser(testingDB, userUUID);
    });

    test("Get user by ID", () => {
      const user = userTable.getUserByID({ userID: 1, testingDB });
      expect(user.userID).toEqual(1);
      expect(user.name).toEqual("name-" + userUUID);
      expect(user.email).toEqual(userUUID + "@shopify.com");
    });

    test("Get user by Email", () => {
      const user = userTable.getUserByEmail({
        email: userUUID + "@shopify.com",
        testingDB,
      });

      expect(user.userID).toEqual(1);
      expect(user.name).toEqual("name-" + userUUID);
      expect(user.email).toEqual(userUUID + "@shopify.com");
    });
  });
});
