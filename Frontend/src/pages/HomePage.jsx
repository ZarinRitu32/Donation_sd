import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const HomePage = () => {
  const [data, setData] = useState([]);
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    
    console.log(user); 
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      getBloodRecords();
    }
  }, [user, navigate]);

  const getBloodRecords = async () => {
    try {
      setLoading(true); 
      const response = await fetch("/inventory/get-inventory");
      const result = await response.json();
      if (result.success) {
        setData(result.inventory);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
        setLoading(false);  // Set loading state to false once done
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-red-900 text-white flex flex-col">
        <h2 className="text-xl font-bold text-yellow-400 p-5">RED GOLD</h2>
        <nav className="mt-4">
          <ul>
            <li className="py-3 px-5 bg-white text-red-900 rounded-l-full">
              <i className="fas fa-box mr-2"></i> Inventory
            </li>
            <li className="py-3 px-5 hover:bg-red-700">
              <i className="fas fa-users mr-2"></i> Donors
            </li>
            <li className="py-3 px-5 hover:bg-red-700">
              <i className="fas fa-hospital mr-2"></i> Hospitals
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center bg-red-950 text-white p-4">
          <span>
            <i className="fas fa-user-circle mr-2"></i>Welcome {user?.name} 
            <span className="bg-gray-600 px-2 py-1 ml-2 text-sm rounded">organization</span>
          </span>
          <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white rounded shadow-md">
          {/* Add Inventory Button */}
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
            <i className="fa-regular fa-square-plus"></i> Add To Inventory
          </button>

          {/* Blood Inventory Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">Inventory Type</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Donor Email</th>
                  <th className="p-3">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr
                    key={record._id}
                    className={`border-b text-center ${
                      record.inventoryType.toLowerCase() === "in"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <td className="p-3">{record.bloodGroup}</td>
                    <td className="p-3 font-semibold">{record.inventoryType.toUpperCase()}</td>
                    <td className="p-3">{record.quantity} ml</td>
                    <td className="p-3">{record.email}</td>
                    <td className="p-3">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error Alert */}
        {error && alert(error)}
      </div>
    </div>
  );
};

export default HomePage;