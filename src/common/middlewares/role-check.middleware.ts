import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from '../exceptions/http.exception';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * Role-based access control middleware.
 * Grants access only if user's role is included in the allowedRoles.
 */
export function roleCheck(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      throw new ForbiddenException();
    }
    next();
  };
}
