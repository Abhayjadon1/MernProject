import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const MasterProtecterRoute = () => {
  const role = localStorage.getItem("role");

  if (role == "master") {
    return <Outlet />;
  } else {
    return (
      <>
        <h1>You can't access this route!</h1>
      </>
    );
  }
};

export default MasterProtecterRoute;
