import ENV from "@/config/env.config";
import { Payload } from "@/types";
import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "./error.util";

export const generateToken = (payload: Payload) => {
  return jwt.sign(
    payload,
    ENV.JWT_SECRET as string,
    {
      expiresIn: ENV.JWT_EXPIRES_IN,
    } as SignOptions,
  );
};

export const verifyToken = (token: string): Payload => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET as string) as Payload;
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};
