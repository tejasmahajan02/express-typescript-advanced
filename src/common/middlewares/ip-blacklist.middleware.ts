import { Request, Response, NextFunction } from 'express';
import { config } from '../../config';
import { ForbiddenException } from '../exceptions/http.exception';
import { getClientIp } from '../utils/http.util';

export default function ipBlacklist(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const clientIp = getClientIp(req);

  if (config.blockedIps.has(clientIp)) {
    throw new ForbiddenException('Access denied.');
  }

  next();
}
