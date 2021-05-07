const userHelpers = require("../helpers/userHelpers");

describe("User helpers test", () => {
  describe("Password", () => {
    test("Generates unique salt and hash each time", () => {
      const password = "password1";
      const passwordInfo1 = userHelpers.getPasswordHash(password);
      const passwordInfo2 = userHelpers.getPasswordHash(password);

      expect(passwordInfo1.hashedPassword).not.toEqual(
        passwordInfo2.hashedPassword
      );
      expect(passwordInfo1.passwordSalt).not.toEqual(
        passwordInfo2.passwordSalt
      );
    });
  });
});
