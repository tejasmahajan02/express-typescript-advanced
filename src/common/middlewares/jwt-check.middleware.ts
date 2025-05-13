import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/http.exception";
import { CookieService, JwtService } from "../services";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { CookieName } from "../enums";

export async function jwtCheck(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Get token from either header or cookies
  const token =
    extractTokenFromHeader(req) ||
    CookieService.getCookie(req, CookieName.ACCESS_TOKEN);

  if (!token) {
    return next(new UnauthorizedException("Token not found."));
  }

  try {
    const payload = JwtService.verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new UnauthorizedException("Token has expired."));
    }
    if (error instanceof JsonWebTokenError) {
      return next(new UnauthorizedException("Invalid token."));
    }
    return next(error);
  }
}

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}
