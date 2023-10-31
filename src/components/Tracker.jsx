import React from "react";
import "./css/Tracker.css";
import Stepper from "./Stepper";

const Tracker = () => {
  const orderId = JSON.parse(localStorage.getItem("orderId"));
  return (
    <div className="Tracker">
      <div className="main">
        <div className="first">
          <h1>Track Delivery Status</h1>
          <h3>{`Order id:-${orderId}`}</h3>
        </div>
        <Stepper orderId={orderId} />
      </div>
    </div>
  );
};

export default Tracker;
