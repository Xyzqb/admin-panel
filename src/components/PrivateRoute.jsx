// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//     const token = localStorage.getItem("authToken");
//     return token ? <Outlet/> : <Navigate to="/login" replace />   
// }

// export default PrivateRoute;


// PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("authToken");

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // Otherwise, render child routes
  return <Outlet />;
};

export default PrivateRoute;
