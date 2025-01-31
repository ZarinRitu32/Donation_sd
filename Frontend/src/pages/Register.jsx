import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import banner2 from "../assets/banner2.jpg";
const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    organization: "",
    hospital: "",
    website: "",
  });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("User Registered");
    } catch (error) {
      console.error("Registration failed");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row shadow-lg p-4 bg-white rounded"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        {/* Left Side - Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src={banner2}
            alt="Blood Donation"
            className="img-fluid rounded"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right Side - Registration Form */}
        <div className="col-md-6 p-4">
          <h2 className="text-center mb-4">Register</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="****"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Full Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Organization Name"
              onChange={(e) =>
                setForm({ ...form, organization: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Hospital Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Hospital Name"
              onChange={(e) => setForm({ ...form, hospital: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Website</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://yourwebsite.com"
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <button className="btn btn-danger w-100" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
//gggh
