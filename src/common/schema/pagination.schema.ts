import { z } from 'zod';
import { SortOrder } from '../enums';
import { nonEmptySchema } from './non-empty.schema';

export const paginationQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    order: z.nativeEnum(SortOrder).default(SortOrder.DESC),
  })
  .strict();

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const searchPaginationQuerySchema = paginationQuerySchema.extend({
  search: nonEmptySchema.max(100).optional(),
});

export type SearchPaginationQuery = z.infer<typeof searchPaginationQuerySchema>;
