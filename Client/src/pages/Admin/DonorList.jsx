import React, { useEffect, useState } from "react";
import API from "../../services/API.JS";
import Layout from "../../components/shared/Layout/Layout";
import TableForAdmin from "../../components/shared/tables/TableForAdmin";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

const DonorList = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const getDonorData = async (req, res) => {
    try {
      const { data } = await API.get("/admin/donor-list");
      if (data?.success) {
        setData(data.donorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonorData();
  }, []);
  return (
    <>
      <Layout>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="md:pl-64 ">
              <h1 className="flex mt-8 items-center text-balck mb-2 justify-center font-serif text-6xl font-bold mx-8 py-2  rounded-lg">
                Welcome Admin {user?.name}
              </h1>
            </div>
          </>
        )}
        <TableForAdmin data={data} list={"Donor List"} />
      </Layout>
    </>
  );
};

export default DonorList;
