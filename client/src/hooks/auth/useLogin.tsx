import { usePostRequest } from "../usePostRequest";
import { login } from "../../api/api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

interface LoginData {
  username: string;
  password: string;
}

const useLogin = () => {
  const { setUser } = useAuth();
  const { sendRequest, loading, error } = usePostRequest<LoginData, any>(login);
  const navigate = useNavigate();

  const loginUser = async (data: LoginData) => {
    const user = await sendRequest(data);
    setUser(user);
    user ? navigate("/") : null; // navigates to home
  };

  return {
    loginUser,
    loading,
    error,
  };
};

export default useLogin;
