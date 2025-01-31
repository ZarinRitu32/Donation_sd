import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39", "#C38154", "#FFC26F", "#4F709C", "#4942E4", "#0079FF", "#FF0060", "#22A699",
  ];

  // GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  // Get function for blood records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      {/* Blood Group Data Cards */}
      <div className="flex flex-wrap gap-4 my-6">
        {data?.map((record, i) => (
          <div
            className="card w-full md:w-72 p-4"
            key={i}
            style={{ backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
              <h1 className="text-white text-xl font-semibold text-center mb-4 bg-black py-2 rounded">
                {record.bloodGroup}
              </h1>
              <p className="text-white">
                Total In: <span className="font-bold">{record.totalIn}</span> (ML)
              </p>
              <p className="text-white">
                Total Out: <span className="font-bold">{record.totalOut}</span> (ML)
              </p>
            </div>
            <div className="card-footer bg-black text-white text-center py-2 rounded">
              Total Available: <span className="font-bold">{record.availabeBlood}</span> (ML)
            </div>
          </div>
        ))}
      </div>

      {/* Recent Blood Transactions Table */}
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Recent Blood Transactions</h1>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left border-b">Blood Group</th>
              <th className="py-2 px-4 text-left border-b">Inventory Type</th>
              <th className="py-2 px-4 text-left border-b">Quantity</th>
              <th className="py-2 px-4 text-left border-b">Donor Email</th>
              <th className="py-2 px-4 text-left border-b">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id} className="border-b">
                <td className="py-2 px-4">{record.bloodGroup}</td>
                <td className="py-2 px-4">{record.inventoryType}</td>
                <td className="py-2 px-4">{record.quantity} (ML)</td>
                <td className="py-2 px-4">{record.email}</td>
                <td className="py-2 px-4">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
