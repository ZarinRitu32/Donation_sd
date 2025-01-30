import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="container">
      <h1>Welcome, {user?.name}</h1>
      <p>Role: {user?.role}</p>
      {user?.role === "Organization" && <p>Manage Blood Donations</p>}
      {user?.role === "Hospital" && <p>Manage Blood Inventory</p>}
    </div>
  );
};

export default Dashboard;
