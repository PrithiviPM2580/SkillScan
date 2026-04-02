import { AppError } from "@/utils/error.util";
import { verifyToken } from "@/utils/jwt.util";
import type { Request, Response, NextFunction } from "express";
import { checkBlacklist } from "@/repositories/blacklist.repository";

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["token"];

  if (!token) {
    return next(new AppError("Authentication token is missing", 401));
  }

  try {
    const decode = verifyToken(token);

    const isBlacklisted = await checkBlacklist(token);

    if (isBlacklisted) {
      return next(new AppError("Token has been blacklisted", 401));
    }

    req.user = decode;
    next();
  } catch (error) {
    return next(new AppError("Invalid authentication token", 401));
  }
};

export default authenticate;
