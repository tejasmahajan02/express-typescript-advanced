import { Request, Response, NextFunction } from "express";
import { getReasonPhrase } from "http-status-codes";

export const httpLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = process.hrtime(); // Start high-resolution timer
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // in ms
    const log = `[${new Date().toLocaleString()}] ${method} ${originalUrl} - ${duration} ms ${res.statusCode} ${getReasonPhrase(res.statusCode)}`;
    console.log(log);
  });

  next();
};
