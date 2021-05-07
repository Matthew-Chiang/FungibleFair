const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

const { getOrCreateDB } = require("./database/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = getOrCreateDB();

app.use("/", indexRouter);
app.use("/user", usersRouter);

module.exports = app;
