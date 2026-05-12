import * as React from "react";
import useForm from "../forms/useForm";
import { account, validateAccountField, updateAccount } from "../../api/api";
import { useAuth } from "../../context/auth";

const useUserProfileForm = () => {
  const [showPasswordFields, setShowPasswordFields] = React.useState(false);
  const initialData = {
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
  };
  const { loadUser } = useAuth();
  const {
    values,
    errorMessage,
    successMessage,
    fieldErrors,
    onChange,
    onBlur,
    onSubmit,
    isSubmitting,
    addFieldValues,
    removeFieldKeys,
  } = useForm(initialData, {
    submit: updateAccount,
    validate: validateAccountField,
    hydrate: () => account("detail"),
  });

  const handleChangePasswordClick = () => {
    setShowPasswordFields(true);
    addFieldValues(["newPassword", "retypePassword"]);
  };

  const handleCancelClick = () => {
    setShowPasswordFields(false);
    removeFieldKeys(["newPassword", "retypePassword"]);
  };

  const handleBlur = (e: any) => {
    onBlur(e.target.name);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitting form with values:", values);
    onSubmit().then((data: any) => {
      loadUser();
    });
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
    handleCancelClick,
    handleChangePasswordClick,
    showPasswordFields,
  };
};

export default useUserProfileForm;
