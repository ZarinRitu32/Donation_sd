import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Login.css";
import banner1 from "../assets/banner1.jpg";

const Login = () => {
    const [role, setRole] = useState("Donor");
  
    return (
      <div className="login-container">
        {/* Left Side (Image) */}
        <div className="login-image">
          <img src={banner1} alt="Blood Donation" />
        </div>
  
        {/* Right Side (Login Form) */}
        <div className="login-form">
          <h2>Login Page</h2>
  
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

{/* Login Form */}
<form>
  <div className="input-group">
    <label>Email</label>
    <input type="email" placeholder="Enter your email" />
  </div>

  <div className="input-group">
    <label>Password</label>
    <input type="password" placeholder="Enter your password" />
  </div>

{/* Register Link */}
<p className="register-text">
            Not registered yet?{" "}
            <Link to="/register" className="register-link">
              Register Here!
            </Link>
          </p>

          {/* Login Button */}
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;