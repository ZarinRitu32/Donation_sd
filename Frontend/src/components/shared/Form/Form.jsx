import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website
            );
        }}
      >
        <h1 className="text-2xl font-semibold text-center mb-4">{formTitle}</h1>
        <hr className="border-t-2 mb-4" />
        
        <div className="flex mb-6 space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="role"
              value="donar"
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="ml-2">Donar</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="role"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="ml-2">Admin</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="role"
              value="hospital"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="ml-2">Hospital</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="role"
              value="organisation"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="ml-2">Organisation</label>
          </div>
        </div>

        {/* Dynamic fields based on formType */}
        {formType === "login" ? (
          <>
            <InputType
              labelText="Email"
              labelFor="forEmail"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            {(role === "admin" || role === "donar") && (
              <InputType
                labelText="Name"
                labelFor="forName"
                inputType="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {role === "organisation" && (
              <InputType
                labelText="Organisation Name"
                labelFor="forOrganisationName"
                inputType="text"
                name="organisationName"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            )}
            {role === "hospital" && (
              <InputType
                labelText="Hospital Name"
                labelFor="forHospitalName"
                inputType="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}
            <InputType
              labelText="Email"
              labelFor="forEmail"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputType
              labelText="Website"
              labelFor="forWebsite"
              inputType="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <InputType
              labelText="Address"
              labelFor="forAddress"
              inputType="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelText="Phone"
              labelFor="forPhone"
              inputType="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        {/* Footer with dynamic message and submit button */}
        <div className="flex justify-between items-center mt-6">
          {formType === "login" ? (
            <p className="text-sm text-gray-600">
              Not registered yet?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register Here!
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already a user?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login Here!
              </Link>
            </p>
          )}
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            type="submit"
          >
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
