import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API from "../../../services/API";
import { getcurrentUser } from "../../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await API.get("/auth/currentuser");
        if (data?.success) {
          dispatch(getcurrentUser(data));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.clear();
        setIsAuthenticated(false);
        console.log(error);
      }
    };

    if (localStorage.getItem("token")) {
      getUser();
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
