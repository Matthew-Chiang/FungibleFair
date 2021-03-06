const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");
const imageRouter = require("./routes/image");
const tagRouter = require("./routes/tag");
const { verify } = require("./middleware/verifyJWT");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/imageLink", express.static("images"));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/profile", verify, profileRouter);
app.use("/image", verify, imageRouter);
app.use("/tag", verify, tagRouter);

module.exports = app;
