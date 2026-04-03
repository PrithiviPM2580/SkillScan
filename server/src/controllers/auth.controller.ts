import type { Request, Response } from "express";
import sendResponse from "@/utils/send-response.util";
import {
  registerService,
  loginService,
  logoutService,
  getCurrentUserService,
} from "@/services/auth.service";
import cookie from "@/utils/cookie.util";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user, token } = await registerService(req.body);

  cookie.set(res, "token", token);

  sendResponse(res, 201, true, "User registered successfully", { user, token });
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user, token } = await loginService(req.body);

  cookie.set(res, "token", token);

  sendResponse(res, 200, true, "User logged in successfully", { user });
};

export const logoutController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = req.cookies["token"];

  await logoutService(token);

  cookie.clear(res, "token");

  sendResponse(res, 200, true, "User logged out successfully");
};

export const getCurrentUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user } = await getCurrentUserService(req.user?.id);

  sendResponse(res, 200, true, "Current user retrieved successfully", { user });
};
