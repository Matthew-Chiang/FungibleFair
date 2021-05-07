const userHelpers = require("../helpers/userHelpers");
const userTable = require("../database/userTable");

exports.verify = (req, res, next) => {
  let accessToken = req.cookies["jwt"];
  if (!accessToken) {
    //403 unauthorized
    return res.status(403).send("No token sent with request");
  }

  const payload = userHelpers.verifyAccessToken(accessToken);

  if (payload.exp > new Date().getTime() / 1000) {
    const user = userTable.getUserByID({ userID: payload.userID });

    req.body.user = user;

    if (user.email == payload.email) {
      next();
    } else {
      return res.status(403).send("Token email invalid");
    }
  } else {
    return res.status(403).send("Token expired");
  }
};
