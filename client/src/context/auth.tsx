import * as React from "react";
import { User } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
}

// Set default value as an empty object with appropriate types
const defaultContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = React.createContext<AuthContextType>(defaultContextValue);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage(
    "user",
    null,
  );

  React.useEffect(() => {
    storedUser ? setUser(storedUser) : setUser(null);
  }, []);

  React.useEffect(() => {
    user ? setStoredUser(user) : removeStoredUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  return context;
};
