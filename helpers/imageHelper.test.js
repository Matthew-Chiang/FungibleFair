const imageHelper = require("../helpers/imageHelper");

describe("Image Helpers", () => {
  test("getPathAndNameForImages", () => {
    const images = [
      {
        imageID: 5,
        pathName: "images/imageID.jpg",
        isPublic: 1,
        userID: 1,
        cost: 23,
        name: "shopify",
      },
      {
        imageID: 7,
        pathName: "images/imageID2.jpg",
        isPublic: 1,
        userID: 1,
        cost: 23,
        name: "shopify",
      },
      {
        imageID: 10,
        pathName: "images/imageID3.jpg",
        isPublic: 0,
        userID: 1,
        cost: 23,
        name: "shopify",
      },
    ];

    const zipParams = imageHelper.getPathAndNameForImages(images);
    expect(zipParams.length).toEqual(3);
    expect(zipParams[1].path).toEqual("images/imageID2.jpg");
    expect(zipParams[2].name).toEqual("shopify3.jpg");
  });
});
