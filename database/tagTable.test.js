const tagTable = require("./tagTable");
const Database = require("better-sqlite3");
const TestingHelpers = require("../testing_helpers/db_testing_helpers");

describe("Helper functions for Tag Table", () => {
  let testingDB;
  beforeEach(() => {
    testingDB = new Database(":memory:", {});

    TestingHelpers.createUserTable(testingDB);
    TestingHelpers.createEmailIndex(testingDB);
    TestingHelpers.createImageTable(testingDB);
    TestingHelpers.createImageUserIDIndex(testingDB);
    TestingHelpers.createTagTable(testingDB);
    TestingHelpers.createTagNameIndex(testingDB);
    TestingHelpers.createTagImageIndex(testingDB);

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

  describe("Get tag tests", () => {
    beforeEach(() => {
      TestingHelpers.insertTag(testingDB, "imageTag", 1);

      const imageUUID2 = TestingHelpers.getUUID();
      TestingHelpers.insertImage(testingDB, imageUUID2);
      TestingHelpers.insertTag(testingDB, "imageTag", 2);
      TestingHelpers.insertTag(testingDB, "imageTag3", 2);

      const imageUUID3 = TestingHelpers.getUUID();
      TestingHelpers.insertImage(testingDB, imageUUID3);
      TestingHelpers.insertTag(testingDB, "imageTag2", 3);
    });

    test("Query tags by name", () => {
      const tags = tagTable.getTagByName({
        tagName: "imageTag",
        testingDB,
      });
      expect(tags.length).toEqual(2);
      expect(tags[0].tagName).toEqual("imageTag");
    });

    test("Query tags by image", () => {
      const tags = tagTable.getTagByImage({
        imageID: 2,
        testingDB,
      });
      console.log(tags);
      expect(tags.length).toEqual(2);
      expect(tags[0].imageID).toEqual(2);
    });
  });
});
