import React, { useContext } from "react";
import { AUTH_CONTEXT } from "../../context/AuthProvider";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AUTH_CONTEXT);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <LoadingSpinner />;
  }
  if (user?.email && isAdmin) {
    return children;
  } else {
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateAdminRoute;
