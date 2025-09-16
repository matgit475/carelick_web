import { usePostRequest } from "../usePostRequest";
import { logout } from "../../api/api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setUser } = useAuth();
  const { sendRequest, loading, error } = usePostRequest(logout);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await sendRequest({});
    setUser(null);
    navigate("/auth/login");
  };

  return {
    logoutUser,
    loading,
    error,
  };
};

export default useLogout;
