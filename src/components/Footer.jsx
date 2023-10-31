import React from "react";
import "./css/Footer.css";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="alan_logo">
        <img
          src={AlanEatsLogo}
          alt=""
        />
      </div>
      <div className="contact_us">
        <h1>Contact us</h1>
        <div className="names">
          Gurneet Singh{" "}
          <a
            href="gurnnetsingh86483@gmail.com"
            target="_blank"
          >
            Reach Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
