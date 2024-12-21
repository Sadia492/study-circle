import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return "loading...";
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
}
