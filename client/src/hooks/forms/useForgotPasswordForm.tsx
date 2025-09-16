import * as React from "react";
import useForgotPassword from "../auth/useForgotPassword";
import useForm from "../forms/useForm";

const useForgotPasswordForm = () => {
  const initialData = { email: "" };
  const { error, loading, sendNewPassword, response } = useForgotPassword();
  const { formData, handleChange, handleSubmit } = useForm(
    initialData,
    sendNewPassword,
  );
  return {
    error,
    loading,
    response,
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useForgotPasswordForm;
