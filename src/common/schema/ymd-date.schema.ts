import { z } from "zod";

// Date regex: YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Validate date string format
export const ymdDateSchema = z
  .string()
  .regex(dateRegex, { message: "Invalid date format. Expected YYYY-MM-DD" })
  .refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    },
    { message: "Invalid date value" }
  );
