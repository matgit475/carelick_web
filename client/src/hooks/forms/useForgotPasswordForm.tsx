import * as React from "react";
import useForm from "../forms/useForm";
import { forgotPassword } from "../../api/api";

const useForgotPasswordForm = () => {
  const initialData = { email: "" };
  const {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    onChange,
    onSubmit,
  } = useForm(initialData, { submit: forgotPassword });

  return {
    values,
    successMessage,
    errorMessage,
    isSubmitting,
    handleChange: onChange,
    handleSubmit: (e: any) => {
      e.preventDefault();
      onSubmit();
    },
  };
};

export default useForgotPasswordForm;
