import type { CookieOptions, Response } from "express";
import ENV from "@/config/env.config";

const cookie = {
  set: (
    res: Response,
    name: string,
    value: string,
    options?: CookieOptions,
  ) => {
    const defaultOptions: CookieOptions = {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    const cookieOptions = { ...defaultOptions, ...options };
    res.cookie(name, value, cookieOptions);
  },

  clear: (res: Response, name: string) => {
    res.clearCookie(name, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });
  },
};

export default cookie;
