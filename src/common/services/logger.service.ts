import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class LoggerService {
    private static logger: Logger = LoggerService.createLoggerInstance();

    constructor(private context: string = 'App') { }

    private static createLoggerInstance(): Logger {
        return createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(({ level, message, timestamp, context }) => {
                    const logLevel = level.toUpperCase().padStart(7); // Align log level
                    const contextStr = context || 'App';
                    return `[${timestamp}] ${logLevel} [${contextStr}] ${message}`;
                })
            ),
            transports: [
                new transports.Console(),
                new DailyRotateFile({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '10m',
                    maxFiles: '14d',
                    zippedArchive: true,
                }),
            ],
        });
    }

    log(message: string) {
        LoggerService.logger.info({ message, context: this.context });
    }

    warn(message: string) {
        LoggerService.logger.warn({ message, context: this.context });
    }

    error(message: string) {
        LoggerService.logger.error({ message, context: this.context });
    }

    debug(message: string) {
        LoggerService.logger.debug({ message, context: this.context });
    }
}

export const logger = new LoggerService('Express');