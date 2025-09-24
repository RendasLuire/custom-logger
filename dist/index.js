"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
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
winston_1.default.addColors(customLevels.colors);
function createLogger(serviceName) {
    return winston_1.default.createLogger({
        levels: customLevels.levels,
        level: "debug",
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.label({ label: serviceName }), winston_1.default.format.printf(({ timestamp, level, message, label }) => {
            return `[${timestamp}] [${label}] ${level}: ${message}`;
        })),
        transports: [
            new winston_1.default.transports.Console(),
            new winston_daily_rotate_file_1.default({
                filename: "logs/%DATE%.log",
                datePattern: "YYYY-MM-DD",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.label({ label: serviceName }), winston_1.default.format.json()),
            }),
        ],
    });
}
