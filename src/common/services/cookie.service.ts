import { CookieOptions, Request, Response } from 'express';
import { config } from '../../config/env.config';
import { CookieName } from '../enums';

export class CookieService {
  static getCookieOptions(
    options: CookieOptions = {},
    isClear = false
  ): CookieOptions {
    const defaultOptions: CookieOptions = {
      httpOnly: true,
      secure: config.node.origin.includes("https"),
      sameSite: "lax",
      path: "/",
      domain: config.session.domain,
      ...(isClear ? {} : { maxAge: config.session.expiresIn }),
      ...options,
    };

    return defaultOptions;
  }

  static setCookie(
    res: Response,
    name: string,
    value: string,
    options: CookieOptions = {}
  ) {
    res.cookie(name, value, CookieService.getCookieOptions(options));
  }

  static getCookie(req: Request, name: CookieName): string | undefined {
    return req.cookies?.[name];
  }

  static clearCookie(
    res: Response,
    name: CookieName,
    options: CookieOptions = {}
  ) {
    res.clearCookie(name, CookieService.getCookieOptions(options, true));
  }

  static clearAllCookies(res: Response, options: CookieOptions = {}) {
    Object.values(CookieName).forEach((name) => {
      res.clearCookie(name, CookieService.getCookieOptions(options, true));
    });
  }
}

