import React from "react";
import "../assets/css/HomePage.css";

const HomePage = () => {
  // Sample data for inventory
  const inventoryData = [
    {
      bloodGroup: "B+",
      type: "IN",
      quantity: "50 ml",
      email: "donar@gmail.com",
      date: "23/12/2023 06:37 PM",
    },
    {
      bloodGroup: "AB+",
      type: "OUT",
      quantity: "10 ml",
      email: "amris@gmail.com",
      date: "23/12/2023 04:00 PM",
    },
    {
      bloodGroup: "AB+",
      type: "IN",
      quantity: "20 ml",
      email: "shubham@gmail.com",
      date: "23/12/2023 03:12 AM",
    },
  ];

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">
          🩸 BLOOD <span>BANK</span>
        </h2>
        <nav>
          <ul>
            <li className="active">Inventory</li>
            <li>Donors</li>
            <li>Hospitals</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <span>
            Welcome <strong>Paras</strong>{" "}
            <span className="badge">organisation</span>
          </span>
          <span>Analytics</span>
          <button className="logout-btn">Logout</button>
        </header>

        {/* Inventory Section */}
        <section className="inventory">
          <h3>➕ Add To Inventory</h3>
          <table>
            <thead>
              <tr>
                <th>Blood Group</th>
                <th>Inventory Type</th>
                <th>Quantity</th>
                <th>Donor Email</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr key={index} className={item.type === "OUT" ? "out" : "in"}>
                  <td>{item.bloodGroup}</td>
                  <td>{item.type}</td>
                  <td>{item.quantity}</td>
                  <td>{item.email}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
