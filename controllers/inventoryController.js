const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

// CREATE INVENTRY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found Please enter valid email address");
    }
    // calculations
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      console.log(requestedBloodGroup);
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      console.log(organisation);
      //  calculate total in BloodQuantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const toatlIn = totalInOfRequestedBlood[0]?.total || 0;
      console.log("totalInOfRequestedBlood" + toatlIn);
      // calculate total out blood Quantity
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const toatlOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      console.log("totalOutOfRequestedBloodGroup" + toatlOut);

      // in & out calc
      const availableQuanityOfBloodGroup = toatlIn - toatlOut;
      console.log("Avilable" + availableQuanityOfBloodGroup);

      // quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is avilable`,
        });
      }
      req.body.hospital = user?._id;
    } else if (req.body.inventoryType == "in") {
      req.body.donor = user?._id;
    }
    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Record Created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

// GET ALL Out BLOOD RECORDS consumers
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospitals consumers recodes successfully ",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get consumer inventory ",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get All inventory ",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Recent Inventory Data",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in recent inventory API ",
      error,
    });
  }
};

// GET DONAR RECORDS
const getDonorsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // find donar?
    const donorId = await inventoryModel.distinct("donor", { organisation });
    // console.log(donarId)
    const donors = await userModel.find({ _id: { $in: donorId } });
    // console.log(donars);
    return res.status(200).send({
      success: true,
      message: "Donor Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donor records",
      error,
    });
  }
};

// GET Hospital RECORDS
const getHospitalsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // find donor?
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Hospital Record Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospitals records",
      error,
    });
  }
};

// GET ORGANISATION RECORDS
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    // find ORGANISATION?
    const organisationId = await inventoryModel.distinct("organisation", {
      donor,
    });
    // console.log(donarId)
    const organisations = await userModel.find({
      _id: { $in: organisationId },
    });
    // console.log(donars);
    return res.status(200).send({
      success: true,
      message: "organisation Record Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in organisation records",
      error,
    });
  }
};

// GET ORGANISATION For Hospital RECORDS
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    // find ORGANISATION?
    const organisationId = await inventoryModel.distinct("organisation", {
      hospital,
    });
    // console.log(donorId
    const organisations = await userModel.find({
      _id: { $in: organisationId },
    });
    // console.log(hospitals);
    return res.status(200).send({
      success: true,
      message: "organisation Record for hospital Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in organisation records",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
