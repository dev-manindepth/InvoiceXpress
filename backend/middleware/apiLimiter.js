import rateLimit from "express-rate-limit";
import { systemLogs } from "../utils/logger.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message:
      "Too many request from this IP address , Please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many request from ${options.message}\t ${req.method}\t ${req.url}\t ${req.header.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 20,
  message: {
    message:
      "Too many login attempt from this IP address, Please try again after 30 minutes",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many request from ${options.message}\t ${req.method}\t ${req.url}\t ${req.header.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});


