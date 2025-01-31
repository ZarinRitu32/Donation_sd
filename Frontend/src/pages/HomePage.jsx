import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch blood records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  if (user?.role === "admin") {
    navigate("/admin");
  }

  return (
    <Layout>
      {error && <span className="text-red-500">{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto p-4">
          <h4
            className="flex items-center cursor-pointer text-green-600 mb-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa-solid fa-plus mr-2 py-2"></i>
            Add Inventory
          </h4>

          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 border-b">Blood Group</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 border-b">Inventory Type</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 border-b">Quantity</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 border-b">Donar Email</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 border-b">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.bloodGroup}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.inventoryType}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.quantity} (ML)</td>
                  <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 border-b">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
