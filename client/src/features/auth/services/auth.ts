import api from "@/lib/axios";
import type { LoginInput, RegisterInput } from "../validation/auth-validation";

export const register = async (registerData: RegisterInput) => {
  try {
    const response = await api.post("/auth/register", registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData: LoginInput) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
