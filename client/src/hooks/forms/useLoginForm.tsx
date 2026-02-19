import useForm from "../forms/useForm";
import { login } from "../../api/api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
  const initialData = { username: "", password: "" };
  const { values, isSubmitting, errorMessage, onChange, onSubmit } = useForm(
    initialData,
    { submit: login },
  );
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit().then((res: any) => {
      console.log("Login response:", res);
      setUser(res);
      if (res?.role == "admin") navigate("/admin-portal/dashboard");
      else if (res?.role == "members") navigate("/member-portal/dashboard");
    });
  };

  return {
    values,
    isSubmitting,
    errorMessage,
    handleChange: onChange,
    handleSubmit,
  };
};

export default useLoginForm;
