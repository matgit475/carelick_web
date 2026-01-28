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
      setUser(res);
      res?.role == "admin" ? navigate("/admin-portal/dashboard") : null; // navigates to dashoboard on successful login
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
