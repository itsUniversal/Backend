const express = require("express");
const app = express();
const morgan = require("morgan");
const usersRouter = require("./routes/usersRouter");

//Middlewares

//Bodyparser
app.use(express.json());

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

//Routes
app.use("/users", usersRouter);
app.all("*", (req, res) =>
  res.status(404).json({
    status: "fail",
    message: "Sorry, this page doesn't exist!",
  })
);

module.exports = app;
