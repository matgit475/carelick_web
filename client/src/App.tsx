import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { ImageLoadProvider } from "./context/imageLoad";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import useScrollToTop from "./hooks/useScrollToTop";
import {
  Home,
  News,
  Events,
  Event,
  Login,
  ForgotPassword,
  Register,
  VerifyOtp,
} from "./pages";

function App() {
  useScrollToTop();
  return (
    <AuthProvider>
      <ImageLoadProvider>
        <Routes>
          <Route path="/">
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="news" element={<News />} />
              <Route path="events" element={<Events />} />
              <Route path="event/:id" element={<Event />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="register" element={<Register />} />
              <Route path="verify-otp" element={<VerifyOtp />} />
            </Route>
          </Route>
        </Routes>
      </ImageLoadProvider>
    </AuthProvider>
  );
}

export default App;
