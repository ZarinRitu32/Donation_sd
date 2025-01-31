import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-grow">
        {/* Sidebar Section */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <Sidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
