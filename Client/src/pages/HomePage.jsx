import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const navigateTo = () => {
    if (user?.role === "organisation") {
      return <Navigate to={"/inventory"}></Navigate>;
    } else if (user?.role === "hospital") {
      return <Navigate to={"/organisation"}></Navigate>;
    } else if (user?.role === "donor") {
      return <Navigate to={"/organisation"}></Navigate>;
    } else if (user?.role === "admin") {
      return <Navigate to={"/donor-list"}></Navigate>;
    }
  };
  return <>{navigateTo()}</>;
}

export default HomePage;
