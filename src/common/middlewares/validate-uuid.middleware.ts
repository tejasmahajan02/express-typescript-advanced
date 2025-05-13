import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions/http.exception';
import { uuidSchema } from '../schema';
import { formatParamList } from '../utils';

export const validateUuid = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const invalidKeys: string[] = [];

  for (const [key, value] of Object.entries(req.params)) {
    if (!uuidSchema.safeParse(value).success) {
      invalidKeys.push(key);
    }
  }

  if (invalidKeys.length > 0) {
    const formattedList = formatParamList(invalidKeys);
    throw new BadRequestException(`Invalid UUID format for ${formattedList}.`);
  }

  next();
};
