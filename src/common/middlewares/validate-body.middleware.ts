import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { BadRequestException } from "../exceptions/http.exception";
import { toCapitalize } from "../utils";

export function validateBody<T extends ZodSchema>(
  schema: T,
  returnEarlyOnFirstError: boolean = false
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData; // Attach the parsed data back to the request object
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = new Map<string, string>();

        // Loop over the errors and store only the first error per field
        for (const issue of error.errors) {
          const fieldPath = issue.path.join(".");

          if (!fieldErrors.has(fieldPath)) {
            const message = !issue.message.includes(fieldPath)
              ? `'${fieldPath}' ${issue.message}`
              : `${issue.message}`;

            fieldErrors.set(fieldPath, toCapitalize(message));
          }

          // If we are returning early on the first error, break after processing the first error
          if (returnEarlyOnFirstError && fieldErrors.size === 1) {
            break;
          }
        }

        // Combine all field errors into a single message string
        let errorMessages = Array.from(fieldErrors.values()).join(", ").trim();

        // Add a period only if the last character is not a period
        if (errorMessages && !errorMessages.endsWith(".")) {
          errorMessages += ".";
        }

        // Throw the error message
        if (errorMessages) {
          throw new BadRequestException(errorMessages);
        }
      }
      next(error);
    }
  };
}
