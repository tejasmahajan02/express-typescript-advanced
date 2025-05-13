import { config } from '../../config/env.config';
import * as jwt from 'jsonwebtoken';

export class JwtService {
  static async generateToken(payload: jwt.JwtPayload): Promise<string> {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  static async verifyToken(token: string): Promise<jwt.JwtPayload> {
    try {
      const payload = jwt.verify(token, config.jwt.secret);
      return payload as jwt.JwtPayload;
    } catch (error) {
      throw error;
    }
  }

  static async decodeToken(token: string): Promise<jwt.JwtPayload> {
    try {
      const payload = jwt.decode(token);
      return payload as jwt.JwtPayload;
    } catch (error) {
      throw error;
    }
  }
}
