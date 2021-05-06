const tagTable = require("./tagTable");
const Database = require("better-sqlite3");
const TestingHelpers = require("../testing_helpers/db_testing_helpers");

describe("Helper functions for Image Table", () => {
  let testingDB;
  beforeEach(() => {
    testingDB = new Database(":memory:", {});

    TestingHelpers.createUserTable(testingDB);
    TestingHelpers.createEmailIndex(testingDB);
    TestingHelpers.createImageTable(testingDB);
    TestingHelpers.createImageUserIDIndex(testingDB);
    TestingHelpers.createTagTable(testingDB);
    TestingHelpers.createTagNameIndex(testingDB);

    const userUUID = TestingHelpers.getUUID();
    TestingHelpers.insertUser(testingDB, userUUID);

    const imageUUID = TestingHelpers.getUUID();
    TestingHelpers.insertImage(testingDB, imageUUID);
  });

  afterEach(() => {
    testingDB.close();
  });

  test("Insert tag", () => {
    const info = tagTable.insertTag({
      tagName: "imageTag",
      imageID: 1,
      testingDB,
    });
    expect(info.changes).toEqual(1);
  });
});
