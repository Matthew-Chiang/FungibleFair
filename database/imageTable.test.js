const imageTable = require("./imageTable");
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

    const userUUID = TestingHelpers.getUUID();
    TestingHelpers.insertUser(testingDB, userUUID);
  });

  afterEach(() => {
    testingDB.close();
  });

  test("Insert image", () => {
    const info = imageTable.insertImage({
      pathName: "/images/path",
      isPublic: 1,
      userID: 1,
      name: "test Image",
      testingDB,
    });

    expect(info.changes).toEqual(1);
  });

  describe("Get image tests", () => {
    beforeEach(() => {
      TestingHelpers.insertImage(testingDB, 1);
      TestingHelpers.insertImage(testingDB, 2);
    });
    test("Get image by userID", () => {
      const images = imageTable.getImageByUserID({ userID: 1, testingDB });
      expect(images.length).toEqual(2);
      expect(images[0].userID).toEqual(1);
    });
    test("Get image by name", () => {
      const images = imageTable.getImageByImageName({
        userID: 1,
        name: "image name 1",
        testingDB,
      });
      expect(images.length).toEqual(1);
      expect(images[0].userID).toEqual(1);
    });
    test("Get all public images", () => {
      const images = imageTable.getAllPublicImages({
        testingDB,
      });
      expect(images.length).toEqual(2);
    });
  });
});
