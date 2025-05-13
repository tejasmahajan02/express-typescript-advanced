import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const statusCode =
    err instanceof HttpException
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  const error =
    err instanceof HttpException
      ? err.error
      : ReasonPhrases.INTERNAL_SERVER_ERROR;

  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).send({
    statusCode,
    error,
    message,
  });
}
