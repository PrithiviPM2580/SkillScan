import { Request, Response, CookieOptions } from "express";
import ENV from "@/config/env.config";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: Number(ENV.JWT_COOKIE_EXPIRES_IN ?? 1) * 24 * 60 * 60 * 1000, // days → ms
};

const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  res.cookie(name, value, { ...baseCookieOptions, ...options });
};

const clearCookie = (
  res: Response,
  name: string,
  options: CookieOptions = {},
) => {
  res.clearCookie(name, { ...baseCookieOptions, ...options });
};

const getCookie = (req: Request, name: string) => {
  return req.cookies?.[name];
};

const cookie = {
  set: setCookie,
  clear: clearCookie,
  get: getCookie,
  options: baseCookieOptions,
};

export default cookie;
