import * as React from "react";
import useForm from "../forms/useForm";
import { validateRegisterField } from "../../api/api";
import { register } from "../../api/api";
import { useAuth } from "../../context/auth";
const useRegisterForm = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  };
  const { setUser } = useAuth();
  const {
    values,
    errorMessage,
    fieldErrors,
    check,
    onChange,
    onChecked,
    onSubmit,
    onBlur,
    successMessage,
    isSubmitting,
  } = useForm(initialData, {
    submit: register,
    validate: validateRegisterField,
  });

  const handleAccept = () => {
    const checkboxElement = document.getElementsByName("termsAccepted")[0];
    checkboxElement.focus();
    check("termsAccepted");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit().then((user: any) => {
      if (user) setUser(user);
    });
  };

  const handleBlur = (e: any) => {
    onBlur(e.target.name);
  };

  return {
    values,
    fieldErrors,
    errorMessage,
    successMessage,
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange: onChange,
    handleChecked: onChecked,
    handleAccept,
  };
};

export default useRegisterForm;
