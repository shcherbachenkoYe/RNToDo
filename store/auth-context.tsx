import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, FC, ReactNode, useState } from "react";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string, userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const authenticate = (token: string, userId: string) => {
    setAuthToken(token);
    setUserId(userId);

    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userId", userId);
  };

  const logout = () => {
    setAuthToken(null);
    setUserId(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
  };

  const value = {
    token: authToken,
    userId: userId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
