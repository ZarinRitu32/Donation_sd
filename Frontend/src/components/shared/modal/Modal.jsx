import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50"
        id="staticBackdrop"
        aria-hidden="true"
      >
        <div className="bg-white rounded-lg shadow-lg w-96">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold" id="staticBackdropLabel">
              Manage Blood Record
            </h1>
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          <div className="p-6">
            <div className="flex mb-4">
              <span className="mr-4">Blood Type:</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value="in"
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-radio text-red-500"
                  />
                  <label htmlFor="in" className="ml-2">IN</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inRadio"
                    value="out"
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-radio text-red-500"
                  />
                  <label htmlFor="out" className="ml-2">OUT</label>
                </div>
              </div>
            </div>

            <select
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Default select example"
              onChange={(e) => setBloodGroup(e.target.value)}
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

            <InputType
              labelText="Donar Email"
              labelFor="donarEmail"
              inputType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Quantity (ML)"
              labelFor="quantity"
              inputType="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="p-4 border-t flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
