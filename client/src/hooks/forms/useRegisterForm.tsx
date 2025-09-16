import * as React from "react";
import useForm from "../forms/useForm";
import useRegister from "../auth/useRegister";
import useOnlyValidateRegister from "../auth/useOnlyValidateRegister";

const useRegisterForm = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  };
  const [error, setError] = React.useState({ status: null, message: null });
  const { registerUser, loading, response } = useRegister(setError);
  const { onlyValidateRegisterUser } = useOnlyValidateRegister(setError);
  const checkboxRef = React.useRef(null);
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitted,
  } = useForm(initialData, registerUser, onlyValidateRegisterUser);

  const handleAccept = () => {
    checkboxRef.current?.focus();
    setFormData({ ...formData, ["termsAccepted"]: true });
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return {
    error,
    loading,
    response,
    formData,
    isSubmitted,
    checkboxRef,
    handleChange,
    handleBlur,
    handleChecked,
    handleSubmit,
    handleAccept,
  };
};

export default useRegisterForm;
