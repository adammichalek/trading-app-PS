import React, { useContext } from "react";
import {Outlet, Navigate} from "react-router";
import { AuthContext } from "../authentication/Auth";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  return !!currentUser ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
