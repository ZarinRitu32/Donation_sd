import React, { useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../services/API.JS";
import { toast } from "react-toastify";

const Modal = ({ onClose }) => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [inventoryType, setInventoryType] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!bloodGroup || !quantity) {
        toast.error("Please provide all fields", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      // calling API for submitting data
      const { data } = await API.post("/inventory/create-inventory", {
        inventoryType,
        bloodGroup,
        quantity,
        email,
        organisation: user?._id,
      });
      if (data?.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        onClose(); // Close modal after successful submission
      } else {
        toast.warn(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <form onSubmit={handleSubmit}>
          {/* Blood Type Selection */}
          <div className="mb-4 flex">
            <label className="block text-gray-700 font-bold mb-2">
              Inventory Type:
            </label>
            <div className="ml-2">
              <input
                type="radio"
                name="inventoryType"
                value="in"
                checked={inventoryType === "in"}
                onChange={(e) => setInventoryType(e.target.value)}
              />
              <span className="mr-4 ml-1">In</span>
              <input
                type="radio"
                name="inventoryType"
                value="out"
                checked={inventoryType === "out"}
                onChange={(e) => setInventoryType(e.target.value)}
              />
              <span className="mr-4 ml-1">Out</span>
            </div>
          </div>

          {/* Blood Group Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Blood Group:
            </label>
            <select
              className="w-full rounded-md border px-2 py-2"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Donor Email:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter donor's email"
            />
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Quantity (ml):
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              placeholder="Enter quantity in ml"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 border bg-red-500 text-white rounded-md mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
