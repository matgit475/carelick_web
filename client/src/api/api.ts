import axios from "axios";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Authentication APIs
export const login = async (data: any) => {
  const response = await API.post("/login", data);
  return response.data;
};

export const otpLogin = async (data: any) => {
  const response = await API.post("/login-with-otp", data);
  return response.data;
};

export const logout = async (data: any) => {
  const response = await API.post("/logout", data);
  return response.data;
};

export const register = async (data: any) => {
  const response = await API.post("/register", data);
  return response.data;
};

export const validateRegisterField = async (data: any) => {
  const response = await API.post("/register/field/validate", data);
  return response.data;
};

export const forgotPassword = async (data: any) => {
  const response = await API.post("/forgot_password", data);
  return response.data;
};

export const resetPassword = async (data: any) => {
  const response = await API.post("/reset_password", data);
  return response.data;
};

export const validateResetPasswordField = async (data: any) => {
  const response = await API.post("/reset_password/field/validate", data);
  return response.data;
};

export const account = (view: any) => API.get(`/account?view=${view}`);

export const validateAccountField = async (data: any) => {
  const response = await API.post("/account/field/validate", data);
  return response.data;
};

export const updateAccount = async (data: any) => {
  const response = await API.post("/update_account", data);
  return response.data;
};

// Website APIs
export const home = async () => {
  const response = await API.get("/home");
  return response.data;
};

export const events = async () => {
  const response = await API.get("/events");
  return response.data;
};

export const userStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const news = async () => {
  const response = await API.get("/news");
  return response.data;
};

export const event = async (id: number | string) => {
  const response = await API.get(`/events/${id}`);
  return response.data;
};

//User Management APIs
export const users = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const deleteUsers = async (data: any) => {
  const response = await API.delete("/users", { data });
  return response.data;
};
