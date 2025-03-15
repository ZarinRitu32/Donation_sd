const userModel = require("../models/userModel");


const getDonorList = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Donor data fetched successfully ",
      donors: donorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donor List API",
      error: error.message,
    });
  }
};



const getHospitalList = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    console.log(hospitalData);
    return res.status(200).send({
      success: true,
      message: "hospital data fetched successfully",
      hospitals: hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital List API",
      error: error.message,
    });
  }
};



const getOrganisationList = async (req, res) => {
  try {
    const organisationData = await userModel
      .find({ role: "oraganisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "organisation data fetched successfully ",
      organisationData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in organisation List API",
      error: error.message,
    });
  }
};



const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error: error.message,
    });
  }
};
module.exports = {
  getDonorList,
  getHospitalList,
  getOrganisationList,
  deleteUser,
};
