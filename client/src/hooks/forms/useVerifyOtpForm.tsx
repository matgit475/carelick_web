import * as React from "react";
import useQueryParams from "../../hooks/useQueryParams";
import useOtpLogin from "../auth/useOtpLogin";
import useForm from "../forms/useForm";

const useVerifyOtpForm = () => {
  const { loginUser, error, loading } = useOtpLogin();
  const query = useQueryParams();
  const email = query.get("email");
  const initialData = { otp: "", email: email };
  const { formData, handleChange, handleSubmit } = useForm(
    initialData,
    loginUser,
  );

  return {
    error,
    loading,
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useVerifyOtpForm;
