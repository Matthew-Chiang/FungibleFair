const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

const { getDB, initDB } = require("./database/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initDB((err) => {
  if (err) {
    console.log(err);
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
