import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-6 text-center">Dashboard</h2>
      <div className="space-y-3">
        {user?.role === "organisation" && (
          <>
            <SidebarItem
              to="/"
              icon="fa-warehouse"
              label="Inventory"
              active={location.pathname === "/"}
            />
            <SidebarItem
              to="/donar"
              icon="fa-hand-holding-medical"
              label="Donor"
              active={location.pathname === "/donar"}
            />
            <SidebarItem
              to="/hospital"
              icon="fa-hospital"
              label="Hospital"
              active={location.pathname === "/hospital"}
            />
          </>
        )}
        {user?.role === "admin" && (
          <>
            <SidebarItem
              to="/donar-list"
              icon="fa-warehouse"
              label="Donor List"
              active={location.pathname === "/donar-list"}
            />
            <SidebarItem
              to="/hospital-list"
              icon="fa-hand-holding-medical"
              label="Hospital List"
              active={location.pathname === "/hospital-list"}
            />
            <SidebarItem
              to="/org-list"
              icon="fa-hospital"
              label="Organisation List"
              active={location.pathname === "/org-list"}
            />
          </>
        )}
        {(user?.role === "donar" || user?.role === "hospital") && (
          <SidebarItem
            to="/orgnaisation"
            icon="fa-building-ngo"
            label="Organisation"
            active={location.pathname === "/orgnaisation"}
          />
        )}
        {user?.role === "hospital" && (
          <SidebarItem
            to="/consumer"
            icon="fa-building-ngo"
            label="Consumer"
            active={location.pathname === "/consumer"}
          />
        )}
        {user?.role === "donar" && (
          <SidebarItem
            to="/donation"
            icon="fa-building-ngo"
            label="Donation"
            active={location.pathname === "/donation"}
          />
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
      active ? "bg-red-500" : "hover:bg-red-600"
    }`}
  >
    <i className={`fa-solid ${icon}`}></i>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
