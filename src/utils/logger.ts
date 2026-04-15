import pino from "pino";

export const logger = pino({
    level: "debug",

    base: {
        pid: false,
    },

    timestamp: pino.stdTimeFunctions.isoTime,

    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname,time",
        },
    },
});
