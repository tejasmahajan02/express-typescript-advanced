import * as dotenv from 'dotenv';
import { Environment } from '../common/enums';
import { Secret, SignOptions } from 'jsonwebtoken';

if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}

const ENV = Object.values(Environment).includes(
  process.env.NODE_ENV as Environment,
)
  ? (process.env.NODE_ENV as Environment)
  : Environment.LOCAL;

const ENV_FILE_PATH = `${process.cwd()}/.env.${ENV}`;
const COMMON_ENV_FILE_PATH = `${process.cwd()}/.env.common`;

dotenv.config({ path: [ENV_FILE_PATH, COMMON_ENV_FILE_PATH] });

export const config = {
  node: {
    env: ENV,
    port: process.env.NODE_PORT || 8081,
    origin: process.env.NODE_ORIGIN || '',
    apiVersion: process.env.NODE_API_VERSION || 'v1',
  },
  jwt: {
    secret: (process.env.JWT_SECRET || 'secret') as Secret,
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'],
  },
  session: {
    secret: process.env.SESSION_SECRET || 'secret',
    expiresIn: parseInt(process.env.SESSION_EXPIRES_IN || '86400000', 10),
    domain: process.env.SESSION_DOMAIN || '',
  },
  client: { origin: process.env.CLIENT_ORIGIN || '' },
  cors: {
    origins:
      process.env.CORS_ORIGINS?.split(',')?.map((item) => item?.trim()) || [],
    pattern: new RegExp(process.env.CORS_ORIGIN_REGEX || ''),
  },
  blockedIps: new Set(
    (process.env.BLOCKED_IPS ?? '').split(',').filter((ip) => ip.trim()),
  ),
  allowedEmailDomains:
    process.env.ALLOWED_EMAIL_DOMAINS?.split(',')?.map((item) =>
      item?.trim(),
    ) || [],
} as const;
