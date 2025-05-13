import { z } from "zod";

export const nullableSchema = z.string().nullable().optional();
