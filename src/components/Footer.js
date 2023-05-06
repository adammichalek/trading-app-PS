import React from "react";
import logo from "../assets/images/Logo_PolSl.svg";

const Footer = () => (
  <footer
    style={{ background: "#f8f9fa", color: "#5f6368" }}
    className="page-footer font-small blue"
  >
    <div className="container text-center text-md-left">
      <div style={{ padding: "5rem" }}>
        <img src={logo} alt="Logo" />
      </div>
    </div>
  </footer>
);

export default Footer;
