const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

const usersRouter = require("./routes/api/usersRouter");
const contactsRouter = require("../src/routes/api/contactsRouter");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const pathFile = path.join(__dirname, "public");
app.use(express.static(pathFile));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
