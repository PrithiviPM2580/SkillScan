import {
  createUser,
  findByEmail,
  findUserByEmail,
  getUserById,
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

  return {
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    token,
  };
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

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};

export const logoutService = async (token?: string) => {
  // Add token to blacklist
  if (token) {
    await createBlacklistToken(token);
  }

  return;
};

export const getCurrentUserService = async (userId?: string) => {
  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  const user = await getUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};
