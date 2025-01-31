// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store"; // Use the default import

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your components and pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donar-list"
            element={
              <ProtectedRoute>
                <DonarList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital-list"
            element={
              <ProtectedRoute>
                <HospitalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/org-list"
            element={
              <ProtectedRoute>
                <OrgList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital"
            element={
              <ProtectedRoute>
                <Hospitals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consumer"
            element={
              <ProtectedRoute>
                <Consumer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donation"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orgnaisation"
            element={
              <ProtectedRoute>
                <OrganisationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donar"
            element={
              <ProtectedRoute>
                <Donar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
