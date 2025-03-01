import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API.JS";
import Donortable from "../../components/shared/tables/Donortable";

export const Donor = () => {
  const [data, setData] = useState([]);
  // find donar record
  const getDonors = async () => {
    try {
      const { data } = await API.get("/inventory/get-donors");
      // console.log(data);
      if (data?.success) {
        setData(data.donors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);
  return (
    <Layout>
      <Donortable data={data} heading={"Donor records"} />
    </Layout>
  );
};
