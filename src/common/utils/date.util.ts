import {
  differenceInSeconds,
  format,
  isAfter,
  isBefore,
  parse,
} from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';
const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const TIMEZONE = 'Asia/Kolkata';

export const getCurrentDate = (): Date => new Date();

export const getFormattedDate = (date: Date = getCurrentDate()): string =>
  format(date, DATE_FORMAT);

export const getFormattedDateTime = (date: Date = getCurrentDate()): string =>
  format(date, DATETIME_FORMAT);

export const getDateTimeDifferenceInSeconds = (date: string): number => {
  const parsedDate = parse(date, DATETIME_FORMAT, getCurrentDate());
  return differenceInSeconds(getCurrentDate(), parsedDate);
};

/**
 * Helper function to parse target and source date strings into Date objects
 * @param target - The target date as a string
 * @param source - The source date as a string
 * @returns Parsed Date objects for both target and source
 */
export const parseDates = (target: string, source: string) => {
  const targetDate = parse(target, DATETIME_FORMAT, new Date());
  const sourceDate = parse(source, DATETIME_FORMAT, new Date());

  // Validate parsed dates
  if (isNaN(targetDate.getTime()) || isNaN(sourceDate.getTime())) {
    throw new Error('Invalid date format provided.');
  }

  return { targetDate, sourceDate };
};

export const isGreaterThan = (target: string, source: string): boolean => {
  const { targetDate, sourceDate } = parseDates(target, source);
  return isAfter(targetDate, sourceDate);
};

export const isLessThan = (target: string, source: string): boolean => {
  const { targetDate, sourceDate } = parseDates(target, source);
  return isBefore(targetDate, sourceDate);
};
