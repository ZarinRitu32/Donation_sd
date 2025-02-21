const mongoose = require("mongoose");
const { Schema } = mongoose; // ✅ Import Schema properly

const inventorySchema = new Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory type required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "Blood quantity is required"], // ✅ Fixed typo "require" -> "required"
    },
    email: {
      type: String,
      required: [true, "Donor Email is required"], // ✅ Fixed typo "Donar" -> "Donor"
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organisation is required"],
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donor: {
      // ✅ Fixed typo "donar" -> "donor"
      type: Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

// ❌ Wrong: export default model("Inventory", inventorySchema);
// ✅ Correct:
module.exports = mongoose.model("Inventory", inventorySchema);
