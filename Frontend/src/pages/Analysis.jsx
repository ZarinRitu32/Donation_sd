import React from "react";
import "./Analysis.css";
import "../assets/css/Analysis.css";

const Analysis = () => {
  return (
    <div className="analysis">
      <h1>RED GOLD</h1>
      <h2>Recent Blood Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Inventory Type</th>
            <th>Quantity</th>
            <th>Donor Email</th>
            <th>Time Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B+</td>
            <td>IN</td>
            <td>50 ml</td>
            <td>donar@gmail.com</td>
            <td>23/12/2023 06:37 PM</td>
          </tr>
          <tr>
            <td>AB+</td>
            <td>OUT</td>
            <td>10 ml</td>
            <td>ami@gmail.com</td>
            <td>23/12/2023 04:00 PM</td>
          </tr>
          <tr>
            <td>AB+</td>
            <td>IN</td>
            <td>20 ml</td>
            <td>shubham@gmail.com</td>
            <td>23/12/2023 03:12 AM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Analysis;
