import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { re } from "mathjs";

export default function ProtectedRoute({ role, children }: any) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
