import { Request, Response, NextFunction, RequestHandler } from "express";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
  ALL = "ALL",
}

export interface ExcludeRule {
  path: string;
  method?: RequestMethod; // "GET", "POST", etc.
}

/**
 * Wraps a middleware to skip it for excluded routes
 */
export function applyMiddleware(
  middleware: RequestHandler,
  exclude: ExcludeRule[] = []
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const shouldSkip = exclude?.some((rule) => {
      const pathMatch = rule.path === req.path || rule.path === "*";
      const methodMatch =
        !rule.method || rule.method.toUpperCase() === req.method;
      return pathMatch && methodMatch;
    });

    if (shouldSkip) {
      return next();
    }

    return middleware(req, res, next);
  };
}
