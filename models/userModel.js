const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donor", "hospital"],
    },

    name: {
      type: String,
      required: function () {
        return this.role === "donor" || this.role === "admin";
      },
    },

    organisationName: {
      type: String,
      validate: {
        validator: function (v) {
          if (this.role === "organisation") {
            return v && v.length > 0; // Ensure non-empty value for 'organisation' role
          }
          return true; // Skip validation if not 'organisation'
        },
        message: "Organisation Name is required for 'organisation' role",
      },
    },

    hospitalName: {
      type: String,
      required: function () {
        return this.role === "hospital";
      },
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    website: {
      type: String,
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
