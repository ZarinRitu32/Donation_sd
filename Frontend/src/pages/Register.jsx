import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Register.css";
import banner2 from "../assets/banner2.jpg";

const Register = () => {
  const [role, setRole] = useState("Donor");

  return (
    <div className="register-container">
      {/* Left Side (Image) */}
      <div className="register-image">
        <img src={banner2} alt="Blood Donation" />
      </div>

      {/* Right Side (Register Form) */}
      <div className="register-form">
        <h2>Register</h2>

        {/* Role Selection */}
        <div className="role-selection">
          {["Donor", "Admin", "Hospital", "Organisation"].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="role"
                value={item}
                checked={role === item}
                onChange={() => setRole(item)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* Registration Form */}
        <form>
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="input-group">
            <label>Website</label>
            <input type="text" placeholder="Enter your website (if any)" />
          </div>

          <div className="input-group">
            <label>Address</label>
            <input type="text" placeholder="Enter your address" />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>

          {/* Login Link */}
          <p className="login-text">
            Already a user?{" "}
            <Link to="/login" className="login-link">
              Login!
            </Link>
          </p>

          {/* Register Button */}
          <button className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
