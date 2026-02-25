import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

const reportsDir = path.join(process.cwd(), "reports"); //Ensure reports directory exists

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const logFilePath = path.join(reportsDir, "execution.log");
fs.writeFileSync(logFilePath, ""); //Clean previous execution.log

const logLevel = process.env.LOG_LEVEL || "info"; //Determine log level

export const logger = createLogger({
  level: logLevel,

  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      if (stack) {
        return `${timestamp} [${level.toUpperCase()}] ${stack}`;
      }
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),

  transports: [
    new transports.File({
      filename: logFilePath,
      level: "debug"
    })
  ]
});