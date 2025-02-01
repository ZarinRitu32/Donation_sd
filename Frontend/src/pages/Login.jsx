import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Login.css";
import banner1 from "../assets/banner1.jpg";

const Login = () => {
    const [role, setRole] = useState("Donor");
  
    return (
      <div className="login-container">
        {/* LEFT SIDE (Image) */}
        <div className="login-image">
          <img src={banner1} alt="Blood Donation" />
        </div>
  
        {/* RIGHT SIDE (Login Form) */}
        <div className="login-form">
          <h2>Login Page</h2>
  
          {/* ROLE SELECTION */}
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

{/* LOGIN FORM */}
<form>
  <div className="input-group">
    <label>Email</label>
    <input type="email" placeholder="Enter Your Email" />
  </div>

  <div className="input-group">
    <label>Password</label>
    <input type="password" placeholder="Enter Your Password" />
  </div>

{/* REGISTER LINK */}
<p className="register-text">
            Not registered yet?{" "}
            <Link to="/register" className="register-link">
              Register Here!
            </Link>
          </p>

          {/* LOGIN BUTTON */}
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;