import * as React from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import PortalLayout from "./layouts/PortalLayout";
import useScrollToTop from "./hooks/useScrollToTop";
import { useAuth } from "./context/auth";

import {
  Home,
  News,
  Events,
  Event,
  Login,
  ForgotPassword,
  Register,
  VerifyOtp,
  Dashboard,
  AccountSettings,
} from "./pages";

function App() {
  useScrollToTop();
  const { user } = useAuth();
  const isAdmin = user && user?.role === "admin";

  return (
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
        {isAdmin && (
          <Route path="/admin-portal" element={<PortalLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account-settings" element={<AccountSettings />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default App;
