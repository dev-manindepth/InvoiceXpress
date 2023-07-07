import chalk from "chalk";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectionToDB from "./config/connectDb.js";
import { morganMiddleware, systemLogs } from "./utils/logger.js";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
await connectionToDB();
const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(morganMiddleware);
app.get("/api/v1/test", (req, res) => {
  return res.json({ message: "hello from test route" });
});
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("✔")} Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(PORT)} `
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
