import * as React from "react";
import useForm from "../forms/useForm";
import { useParams } from "react-router-dom";
import { resetPassword, validateResetPasswordField } from "../../api/api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const useResetPasswordForm = () => {
  const { token } = useParams();
  const initialData = { newPassword: "", retypePassword: "", token: token };
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    onChange,
    onBlur,
    onSubmit,
    fieldErrors,
  } = useForm(initialData, {
    submit: resetPassword,
    validate: validateResetPasswordField,
  });

  const handleBlur = (e: any) => {
    onBlur(e.target.name);
  };

  return {
    values,
    fieldErrors,
    successMessage,
    errorMessage,
    isSubmitting,
    handleBlur,
    handleChange: onChange,
    handleSubmit: (e: any) => {
      e.preventDefault();
      onSubmit().then((res: any) => {
        console.log("Login response:", res);
        setUser(res);
        if (res?.role == "admin") navigate("/admin-portal/dashboard");
        else if (res?.role == "members") navigate("/member-portal/dashboard");
      });
    },
  };
};

export default useResetPasswordForm;
