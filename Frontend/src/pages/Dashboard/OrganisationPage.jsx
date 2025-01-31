import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // find org records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-orgnaisation-for-hospital");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto mt-6 px-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Organisation Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Phone</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Address</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800 border-b">{record.organisationName}</td>
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

export default OrganisationPage;
