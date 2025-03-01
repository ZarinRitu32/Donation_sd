import moment from "moment";
import API from "../../../services/API.JS";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function TableForAdmin({ data = [], list }) {
  // Handle delete operation
  const handelDelete = async (id) => {
    try {
      const ans = window.prompt(
        "Are you sure you want to delete this donor?",
        "sure"
      );
      if (!ans) return;

      const response = await API.delete(`/admin/delete-user/${id}`);

      if (response.data?.success) {
        toast(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting donor:", error);
      toast.error("Failed to delete donor.");
    }
  };

  // Debugging to check if data is being received
  console.log("TableForAdmin received data:", data);

  return (
    <div className="flex md:pl-64 m-8 flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="mt-2">
          <h1 className="flex items-center text-white mb-2 justify-center font-serif text-6xl font-bold bg-gradient-to-b from-red-600 to-pink-300 mx-8 rounded-lg">
            {list}
          </h1>
        </div>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time & Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((record) => (
                    <tr key={record._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record?.organisationName ||
                          record?.name ||
                          record?.hospitalName ||
                          "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.updatedAt
                          ? moment(record.updatedAt).format(
                              "DD/MM/YYYY hh:mm A"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 items-center whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => handelDelete(record._id)}
                          className="button inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </motion.button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
