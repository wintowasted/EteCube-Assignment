import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const jwt = localStorage.getItem("accessToken");

  return <>{jwt ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default RequireAuth;
