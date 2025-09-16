import { usePostRequest } from "../usePostRequest";
import { forgotPassword } from "../../api/api";

interface ForgotPasswordData {
  email: string;
}

const useForgotPassword = () => {
  const { sendRequest, loading, error, response } = usePostRequest<
    ForgotPasswordData,
    any
  >(forgotPassword);

  const sendNewPassword = async (data: ForgotPasswordData) => {
    await sendRequest(data);
  };

  return {
    sendNewPassword,
    response,
    loading,
    error,
  };
};

export default useForgotPassword;
