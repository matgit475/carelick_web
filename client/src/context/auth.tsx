import * as React from "react";
import { account } from "../api/api";
import useGetRequest from "../hooks/api/useGetRequest";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState(null);
  const { sendRequest } = useGetRequest(() => account("basic"));
  const loadUser = () => {
    sendRequest().then((res: any) => {
      setUser(res?.data);
    });
  };
  React.useEffect(() => {
    loadUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};
