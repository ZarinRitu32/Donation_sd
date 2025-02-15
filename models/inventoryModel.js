const mongoose = require("mongoose")
const inventorySchema = new Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    email: {
      type: String,
      required: [true, "Donar Email is Required"],
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "organisation is require"],
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

export default model("Inventory",inventorySchema)