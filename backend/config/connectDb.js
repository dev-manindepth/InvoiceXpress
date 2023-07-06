import mongoose from "mongoose";
import chalk from "chalk";
import { systemLogs } from "../utils/logger.js";

const connectionToDB = async () => {
  try {
    const connectionParams = {
      dbName: process.env.DB_NAME,
    };
    const connect = await mongoose.connect(
      process.env.MONGO_URI,
      connectionParams
    );
    console.log(
      `${chalk.blue.bold(`MongoDB Connected: ${connect.connection.host}`)}`
    );
    systemLogs.info(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(`${chalk.red.bold(`Error: ${err.message}`)}`);
    process.exit(1);
  }
};

export default connectionToDB;