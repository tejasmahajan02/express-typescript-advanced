import { z } from "zod";

export const ipSchema = z.string().ip().or(z.string());