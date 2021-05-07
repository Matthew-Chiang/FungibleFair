const userHelpers = require("../helpers/userHelpers");

describe("User helpers test", () => {
  describe("Password", () => {
    const password = "password1";
    test("Generates unique salt and hash each time", () => {
      const passwordInfo1 = userHelpers.getPasswordHash(password);
      const passwordInfo2 = userHelpers.getPasswordHash(password);

      expect(passwordInfo1.hashedPassword).not.toEqual(
        passwordInfo2.hashedPassword
      );
      expect(passwordInfo1.passwordSalt).not.toEqual(
        passwordInfo2.passwordSalt
      );
    });

    test("Login function matches created password", () => {
      const passwordInfo = userHelpers.getPasswordHash(password);
      const hashedPassword = userHelpers.hashPasswordWithSalt(
        password,
        passwordInfo.passwordSalt,
        passwordInfo.passwordItr
      );

      expect(passwordInfo.hashedPassword).toEqual(hashedPassword);
    });
  });

  describe("Access Tokens", () => {
    test("Can retrieve payload after signing and verifying", () => {
      const token = userHelpers.generateAccessToken(1, "email@shopify.com");

      const payload = userHelpers.verifyAccessToken(token);
      expect(payload.userID).toEqual(1);
      expect(payload.email).toEqual("email@shopify.com");
    });
  });
});
