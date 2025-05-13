import { z } from "zod";

export const booleanSchema = z.union([z.literal(0), z.literal(1)]);
