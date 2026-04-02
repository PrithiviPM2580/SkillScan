import type { Request, Response } from "express";
import sendResponse from "@/utils/send-response.util";
import { registerService } from "@/services/auth.service";
import cookie from "@/utils/cookie.util";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user, token } = await registerService(req.body);

  cookie.set(res, "token", token);

  sendResponse(res, 201, true, "User registered successfully", { user, token });
};
