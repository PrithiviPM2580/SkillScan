import { createUser, findUserByEmail } from "@/repositories/auth.repository";
import { AppError } from "@/utils/error.util";
import { generateToken } from "@/utils/jwt.util";
import { RegisterInput } from "@/validation/auth.validation";

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
