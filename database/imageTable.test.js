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
            cost: 3.14,
            userID: 1,
            testingDB,
        });

        expect(info.changes).toEqual(1);
    });

    describe("Get image tests", () => {
        beforeEach(() => {
            TestingHelpers.insertImage(testingDB);
        });
        test("Get image by userID", () => {
            const image = imageTable.getImageByUserID({ userID: 1, testingDB });
            console.log(image);
        });
    });
});
