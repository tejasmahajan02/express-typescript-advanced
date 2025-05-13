import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { BadRequestException } from "../exceptions/http.exception";

export function validatePaginationQuery<T extends ZodSchema>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.query);
      req.query = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors
          .map((issue: any) => `${issue.path.join(".")} ${issue.message}`)
          .join(",")
          .trim()
          .toLocaleLowerCase();
        throw new BadRequestException(errorMessages);
      }
      next(error);
    }
  };
}
