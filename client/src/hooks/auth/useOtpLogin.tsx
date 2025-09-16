import { usePostRequest } from "../usePostRequest";
import { otpLogin } from "../../api/api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  otp: string;
}

const useOtpLogin = () => {
  const { setUser } = useAuth();
  const { sendRequest, loading, error } = usePostRequest<LoginData, any>(
    otpLogin,
  );
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

export default useOtpLogin;
