import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");

  return (
    <div className="form-container">
      <h1>{formTitle}</h1>
      <hr />
      <div className="role-selection">
        <label>
          <input
            type="radio"
            name="role"
            value="donar"
            checked={role === "donar"}
            onChange={(e) => setRole(e.target.value)}
          />
          Donar
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={(e) => setRole(e.target.value)}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="hospital"
            checked={role === "hospital"}
            onChange={(e) => setRole(e.target.value)}
          />
          Hospital
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="organisation"
            checked={role === "organisation"}
            onChange={(e) => setRole(e.target.value)}
          />
          Organisation
        </label>
      </div>
      <InputType
        labelText={"Email"}
        labelFor={"forEmail"}
        inputType={"email"}
        name={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputType
        labelText={"Password"}
        labelFor={"forPassword"}
        inputType={"password"}
        name={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" type="submit">
        {submitBtn}
      </button>
      <div className="link-text">
        {formType === "login" ? (
          <p>
            Not registered yet? <Link to="/register">Register Here!</Link>
          </p>
        ) : (
          <p>
            Already a user? <Link to="/login">Login Here!</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
