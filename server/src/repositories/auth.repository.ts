import User from "@/models/user.model";
import { RegisterInput } from "@/validation/auth.validation";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email }).lean();
};

export const createUser = async (userData: RegisterInput) => {
  return User.create(userData);
};
