import User from "@/models/user.model";
import { RegisterInput } from "@/validation/auth.validation";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email }).lean();
};

export const findByEmail = async (email: string) => {
  return User.findByEmail(email);
};

export const createUser = async (userData: RegisterInput) => {
  return User.create(userData);
};

export const getUserById = async (userId: string) => {
  return User.findById(userId).lean();
};
