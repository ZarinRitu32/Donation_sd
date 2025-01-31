import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand/Logo Section */}
        <div className="flex items-center space-x-2">
          <BiDonateBlood className="text-red-500 text-3xl" />
          <span className="text-2xl font-semibold">Blood Bank App</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li className="flex items-center space-x-2">
            <BiUserCircle className="text-xl" />
            <p className="text-sm">
              Welcome{" "}
              {user?.name || user?.hospitalName || user?.organisationName}
              <span className="ml-2 text-xs text-gray-500 badge bg-gray-200 rounded-md px-2 py-1">
                {user?.role}
              </span>
            </p>
          </li>

          {/* Conditional Navigation Link */}
          {location.pathname === "/" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <li>
              <Link
                to="/analytics"
                className="text-lg text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Analytics
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/"
                className="text-lg text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Home
              </Link>
            </li>
          )}

          {/* Logout Button */}
          <li>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
