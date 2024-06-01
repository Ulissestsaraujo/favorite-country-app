import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationContext from "../context/AuthenticationContext";

const PrivateRoute = ({ element: Element }) => {
  const { userId } = useContext(AuthenticationContext);

  return userId ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
