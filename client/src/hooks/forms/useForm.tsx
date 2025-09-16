import * as React from "react";

const useForm = (
  initialData: any,
  submitForm: (data: any) => void,
  validateForm?: (data: any) => void,
) => {
  const [formData, setFormData] = React.useState(initialData);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    await submitForm(formData);
  };

  const handleBlur = async (e: React.FormEvent) => {
    e.preventDefault();
    isSubmitted ? await validateForm(formData) : null;
  };

  return {
    formData,
    isSubmitted,
    setFormData,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
