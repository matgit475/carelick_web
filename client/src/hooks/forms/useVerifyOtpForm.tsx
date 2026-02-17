import useQueryParams from "../useQueryParams";
import useForm from "../forms/useForm";
import { otpLogin } from "../../api/api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const useVerifyOtpForm = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const query = useQueryParams();
  const email = query.get("email");
  const initialData = { otp: "", email: email };
  const { values, errorMessage, isSubmitting, onChange, onSubmit } = useForm(
    initialData,
    {
      submit: otpLogin,
    },
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit().then((user: any) => {
        setUser(user);
        user.role == "admin" ? navigate("/admin-portal/dashboard") : null; // navigates to home
    });
  };
  return {
    values,
    errorMessage,
    isSubmitting,
    handleChange: onChange,
    handleSubmit,
  };
};

export default useVerifyOtpForm;
