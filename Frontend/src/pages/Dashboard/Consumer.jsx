import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-6 px-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Blood Group</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Inventory Type</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Quantity</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.bloodGroup}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.inventoryType}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.quantity}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.email}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Consumer;
