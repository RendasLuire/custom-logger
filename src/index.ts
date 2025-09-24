import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
  },
};

winston.addColors(customLevels.colors);

export function createLogger(serviceName: string) {
  return winston.createLogger({
    levels: customLevels.levels,
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.label({ label: serviceName }),
      winston.format.printf(({ timestamp, level, message, label }) => {
        return `[${timestamp}] [${label}] ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        filename: "logs/%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.label({ label: serviceName }),
          winston.format.json()
        ),
      }),
    ],
  });
}
