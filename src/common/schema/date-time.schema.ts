import { z } from "zod";

export const dateSchema = z.string().date();
export const dateTimeSchema = z.string().datetime();
