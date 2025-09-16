import * as React from "react";
import { usePostRequest } from "../usePostRequest";
import { register } from "../../api/api";
import { useAuth } from "../../context/auth";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const useRegister = (setError: any) => {
  const { setUser } = useAuth();
  const { sendRequest, loading, error, response } = usePostRequest<
    RegisterData,
    any
  >(register);

  React.useEffect(() => {
    setError(error);
  }, [error]);

  const registerUser = async (data: RegisterData) => {
    setUser(await sendRequest(data));
  };

  return {
    registerUser,
    response,
    loading,
    error,
  };
};

export default useRegister;
