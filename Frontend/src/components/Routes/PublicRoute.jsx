import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // If there's a token, redirect to home (protected routes)
  if (localStorage.getItem("token")) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">
          Redirecting to Home...
        </div>
      </div>
    );
  } else {
    return children;
  }
};

export default PublicRoute;
