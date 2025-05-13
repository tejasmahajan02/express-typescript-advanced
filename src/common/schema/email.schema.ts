import { z } from 'zod';
import { nonEmptySchema } from './non-empty.schema';
import { config } from '../../config';

export const emailSchema = z
  .object({
    email: nonEmptySchema
      .email()
      .refine(
        (email) =>
          config.allowedEmailDomains.some((domain) =>
            email.toLowerCase().endsWith(domain),
          ),
        { message: 'not allowed.' },
      )
      .transform((email) => email.toLowerCase()),
  })
  .strict();
