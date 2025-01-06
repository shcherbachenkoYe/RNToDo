import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, FC, ReactNode, useState } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const authenticate = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
