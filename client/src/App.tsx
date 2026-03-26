import * as React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminPortalLayout from "./layouts/AdminPortalLayout";
import MemberPortalLayout from "./layouts/MemberPortalLayout";
import useScrollToTop from "./hooks/useScrollToTop";
import ProtectedRoute from "./Route/ProtectedRoute";
import { useAuth } from "./context/auth";
import NotFound from "./pages/NotFound";

import {
  Home,
  News,
  Events,
  Event,
  Login,
  ForgotPassword,
  ResetPassword,
  Register,
  VerifyOtp,
  Dashboard,
  AccountSettings,
  Users,
} from "./pages";
import BackToTop from "./components/BackToTop";

function App() {
  useScrollToTop();
  const { user } = useAuth();

  return (
    <>
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
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-otp" element={<VerifyOtp />} />
          </Route>
          <Route
            path="/admin-portal"
            element={
              <ProtectedRoute role="admin">
                <AdminPortalLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route
            path="/member-portal"
            element={
              <ProtectedRoute role="members">
                <MemberPortalLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<></>} />
            <Route path="account-settings" element={<AccountSettings />} />
          </Route>
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <BackToTop />
    </>
  );
}

export default App;
