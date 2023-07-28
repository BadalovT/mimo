import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Types = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: any) {
  let accesstoken = null;
  const accesstokenLocal = localStorage.getItem("mimoToken");

  if (accesstokenLocal !== null) {
    accesstoken = JSON.parse(accesstokenLocal);
  }

  const location = useLocation();
  if (!accesstoken) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
    // return <Navigate to="sign-in" state={{ from: location }} replace />;
  }
  return children;
}
