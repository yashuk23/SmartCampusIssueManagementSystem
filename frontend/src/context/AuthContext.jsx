import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

const getStoredValue = (key) => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = getStoredValue("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => getStoredValue("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [token, user]);

  const authenticate = async (service, payload, successMessage) => {
    setLoading(true);
    try {
      const data = await service(payload);
      setUser(data.user);
      setToken(data.token);
      toast.success(successMessage);
      return data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = (payload) => authenticate(loginUser, payload, "Welcome back");
  const register = (payload) => authenticate(registerUser, payload, "Account created successfully");

  const logout = () => {
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user && token)
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
