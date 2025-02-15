const userModel = require("../models/userModel");

const createInventoryController = async(req,res) => {
    try{
        

    }catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

module.exports = {createInventoryController };
