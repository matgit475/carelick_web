import * as React from "react";
import useLogin from "../auth/useLogin";
import useForm from "../forms/useForm";

const useLoginForm = () => {
  const initialData = { username: "", password: "" };
  const { loginUser, error, loading } = useLogin();
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

export default useLoginForm;
