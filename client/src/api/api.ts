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
  const response = await API.post("/register?validateOnly=false", data);
  return response.data;
};

export const validateOnlyRegister = async (data: any) => {
  const response = await API.post("/register?validateOnly=true", data);
  return response.data;
};

export const forgotPassword = async (data: any) => {
  const response = await API.post("/forgot_password", data);
  return response.data;
};

export const currentUser = async () => {
  const response = await API.get("/current_user");
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

export const news = async () => {
  const response = await API.get("/news");
  return response.data;
};

export const event = async (id: number | string) => {
  const response = await API.get(`/events/${id}`);
  return response.data;
};
