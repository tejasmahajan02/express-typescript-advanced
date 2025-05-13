import { z } from 'zod';
import { nonEmptySchema } from './non-empty.schema';

export const passwordSchema = z
  .object({
    password: nonEmptySchema.min(8),
  })
  .strict();

export const strongPasswordSchema = z
  .object({
    password: nonEmptySchema
      .min(8, 'must be at least 8 characters long')
      .regex(/[A-Z]/, 'must include at least one uppercase letter')
      .regex(/[a-z]/, 'must contain at least one lowercase letter')
      .regex(/[0-9]/, 'must have at least one number')
      .regex(/[^A-Za-z0-9]/, 'requires at least one special character'),
  })
  .strict();
