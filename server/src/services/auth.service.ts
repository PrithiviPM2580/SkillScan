import {
  createUser,
  findByEmail,
  findUserByEmail,
} from "@/repositories/auth.repository";
import { AppError } from "@/utils/error.util";
import { generateToken } from "@/utils/jwt.util";
import { LoginInput, RegisterInput } from "@/validation/auth.validation";
import { createBlacklistToken } from "@/repositories/blacklist.repository";

export const registerService = async (registerData: RegisterInput) => {
  const { username, email, password } = registerData;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  // Create new user
  const newUser = await createUser({ username, email, password });

  // Generate JWT token
  const token = generateToken({
    id: String(newUser._id),
    email: newUser.email,
  });

  return { user: newUser, token };
};

export const loginService = async (loginData: LoginInput) => {
  const { email, password } = loginData;

  // Check if user exists
  const user = await findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  //Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate JWT token
  const token = generateToken({
    id: String(user._id),
    email: user.email,
  });

  return { user, token };
};

export const logoutService = async (token?: string) => {
  // Add token to blacklist
  if (token) {
    await createBlacklistToken(token);
  }

  return;
};
