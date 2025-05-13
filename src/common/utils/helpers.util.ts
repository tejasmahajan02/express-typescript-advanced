import { Application } from 'express';
import expressListEndpoints from 'express-list-endpoints';

export function logRoutes(app: Application) {
  if (process.env.NODE_ENV === 'test') return;

  const endpoints = expressListEndpoints(app);

  console.log('\n📦 Registered Routes:\n');

  endpoints.forEach(({ path, methods }) => {
    methods.forEach((method) => {
      console.log(`[${method}] ${path}`);
    });
  });

  console.log();
}

export function toCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function delay(ms = 3000): Promise<void> {
  const min = ms;
  const max = ms * 3;
  const jitter = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, jitter));
}

export function convertListToIndexMap<T>(list: T[]): Record<number, T> {
  return Object.fromEntries(list.map((item, index) => [index, item]));
}

export function formatParamList(keys: string[]): string {
  if (keys.length === 1) return keys[0];
  if (keys.length === 2) return `${keys[0]} and ${keys[1]}`;
  return `${keys.slice(0, -1).join(", ")}, and ${keys[keys.length - 1]}`;
}
