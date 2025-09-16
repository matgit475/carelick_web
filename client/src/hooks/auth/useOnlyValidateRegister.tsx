import * as React from "react";
import { usePostRequest } from "../usePostRequest";
import { validateOnlyRegister } from "../../api/api";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const useOnlyValidateRegister = (setError: any) => {
  const { sendRequest, loading, error } = usePostRequest<RegisterData, any>(
    validateOnlyRegister,
  );

  React.useEffect(() => {
    setError(error);
  }, [error]);

  const onlyValidateRegisterUser = async (data: RegisterData) => {
    console.log("send request");
    await sendRequest(data);
  };

  return {
    onlyValidateRegisterUser,
    loading,
    error,
  };
};

export default useOnlyValidateRegister;
