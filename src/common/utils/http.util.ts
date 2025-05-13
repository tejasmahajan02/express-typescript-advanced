import { Request } from 'express';

export function getClientIp(req: Request): string {
  const rawIP =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    req.ip;

  // Normalize IPv6 + dev local IP
  const ip = rawIP
    ?.replace(/^::ffff:/, "") // IPv6-mapped IPv4
    .replace(/^::1$/, "127.0.0.1") // IPv6 loopback
    .replace(/^127\.0\.0\.1$/, "49.205.192.1"); // Replace localhost in dev

  return ip!;
}

export function getUserAgent(req: Request): string {
  return req.headers['user-agent'] as string;
}
