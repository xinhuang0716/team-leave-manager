import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>LeaVe ^^</h2>
      <ul>
        <li>
          <Link to="/">Calendar</Link>
        </li>
        <li>
          <Link to="/records">Records</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
