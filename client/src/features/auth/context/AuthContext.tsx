import type { User } from "@/types";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getUser, login, logout, register } from "../services/auth";
import type { LoginInput, RegisterInput } from "../validation/auth-validation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: unknown;
  loginUser: (loginData: LoginInput) => Promise<void>;
  registerUser: (registerData: RegisterInput) => Promise<void>;
  logoutUser: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const loginUser = useCallback(async (loginData: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(loginData);
      setUser(userData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(async (registerData: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await register(registerData);
      setUser(userData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const logoutUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      loginUser,
      registerUser,
      logoutUser,
      fetchUser,
    }),
    [user, loading, error, loginUser, registerUser, logoutUser, fetchUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
