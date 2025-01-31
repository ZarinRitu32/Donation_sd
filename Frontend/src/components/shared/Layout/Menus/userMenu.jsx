import React from "react";
import { Link } from "react-router-dom";
import { userMenu } from "./userMenu"; // Assuming userMenu is exported from another file

const UserMenu = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-64 p-4">
      <div className="space-y-4">
        {userMenu.map((menuItem) => (
          <Link
            key={menuItem.name}
            to={menuItem.path}
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            <i className={`${menuItem.icon} mr-3`}></i>
            <span className="text-lg">{menuItem.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
