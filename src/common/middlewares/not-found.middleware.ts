import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions/http.exception';

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  throw new NotFoundException(`Cannot ${req.method} ${req.originalUrl}`);
}
