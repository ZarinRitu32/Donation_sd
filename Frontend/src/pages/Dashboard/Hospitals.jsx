import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Hospitals = () => {
  const [data, setData] = useState([]);

  // Fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-6 px-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Hospital Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Phone</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Address</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.hospitalName}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.email}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.phone}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.address}</td>
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Hospitals;
