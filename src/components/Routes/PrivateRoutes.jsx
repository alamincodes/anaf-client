import React, { useContext } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AUTH_CONTEXT);

  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (user?.email) {
    return children;
  } 
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
