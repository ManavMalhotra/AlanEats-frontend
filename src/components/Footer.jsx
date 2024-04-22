import React from "react";
import "./css/Footer.css";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="alan_logo">
        <img src={AlanEatsLogo} alt="" />
      </div>
      <div className="contact_us">
        <h1>Contact us</h1>
        <div className="names">Gurneet Singh </div>
        <div className="names">Nitin Saini </div>
        <div className=" names">
          Manav Malhotra
          <a
            href="manavmalhotrafrnd4u@gmail.com"
            target="_blank"
            className="mx-4"
          >
            Reach Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
