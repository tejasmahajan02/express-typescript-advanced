import { z } from 'zod';
import { GenericFields } from '../../../common/types';
import { emailSchema, strongPasswordSchema } from '../../../common/schema';
import { nonEmptySchema } from '../../../common/schema/non-empty.schema';

export const userSchema = z
  .object({
    name: nonEmptySchema,
  })
  .merge(emailSchema)
  .merge(strongPasswordSchema)
  .strict();

export type UserDto = z.infer<typeof userSchema>;
export type UserSchema = UserDto & GenericFields;

export const updateUserSchema = userSchema.partial().strict();
