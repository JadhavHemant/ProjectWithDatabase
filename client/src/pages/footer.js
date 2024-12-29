import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer>
      {/* Add footer content here */}
      <p style={{ fontFamily: "Poppins" }}>
        &copy; {new Date().getFullYear()} Capitol Tunnels.ai
      </p>
    </footer>
  );
};

export default Footer;
