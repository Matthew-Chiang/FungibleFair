var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//sqlite database
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(
  "./database/fungible.db",
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
