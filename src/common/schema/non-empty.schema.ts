import { z } from "zod";

export const nonEmptySchema = z
  .string()
  .trim()
  .min(1, "Field is required and cannot be empty or just spaces");
