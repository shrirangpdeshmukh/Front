const express = require("express");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const AppError = require("./utils/appError.js");
const errorHandler = require("./utils/errorHandler");
const { NODE_ENV } = require("./utils/config");

//ROUTERS
const userRouter = require("./routes/userRouter");
const topicRouter = require("./routes/topicRouter");
const taskRouter = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");
const announcementRouter = require("./routes/announcementRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");
const reportRouter = require("./routes/reportRouter");

const app = express();

const deleteArchiveCron = require("./cron/deleteArchived");

//CORS Request
app.use(cors({ origin: true, credentials: true }));

app.options("*", cors());

app.set("view engine", "ejs");

app.use(helmet());

// Data sanitization against XSS
app.use(xss());

app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//REQUEST LOGGER
if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

deleteArchiveCron.start();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/board/leaderboard", leaderboardRouter);
app.use("/api/v1/board/topics", taskRouter);
app.use("/api/v1/board/topics", topicRouter);
app.use("/api/v1/board/announcements", announcementRouter);
app.use("/api/v1/reportTest", reportRouter);

//client/build
if (NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//NO URL
app.all("*", (req, res, next) => {
  next(new AppError(`No url found found for ${req.url}`, 404));
});

app.use(errorHandler);

module.exports = app;
