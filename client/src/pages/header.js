import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "./logo.png";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Capitol Tunnels.io" />
        </Link>
      </div>
      <div class="dropdown" style={{ marginRight: "200px" }}>
        <button class="dropbtn">
          Menu
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="/company">Company</a>
          <a href="/riskmanagement">Risk</a>
          <a href="/objtype">Object Type</a>
          <a href="/secondTable">Object Name</a>
          <a href="/res">Responsibility Group</a>
          <a href="/resp2">Responsibility Center</a>
          <a href="/parameter">Parameter</a>
          <a href="/par">Parameter category</a>
          <a href="/risk">Risk Category</a>
          <a href="/sub">Sub Category</a>
          <a href="/riskgroup">Risk Group</a>
          <a href="/riskseverity">Risk Severity</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
