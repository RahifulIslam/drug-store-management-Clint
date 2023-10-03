// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/users">Employee</Link>
        </li>
        <li>
          <Link to="/medicines">Medicines</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
