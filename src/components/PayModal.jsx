import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { capitalize } from "@material-ui/core";
import { PayAction, PaymentAction } from "../redux/actions/payAction";
import { useDispatch, useSelector } from "react-redux";
import { AlertMessage } from "./AlertMessage";

const PayModal = ({ orderId }) => {
  const [show, setShow] = useState(true);
  let history = useHistory();
  const dispatch = useDispatch();

  const isPay = useSelector((state) => state.pay.isShowPay);

  const handleClose = () => {
    setShow(false);
    history.push("/foodTracker");
  };

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  useEffect(() => {
    dispatch(PayAction(false));
    dispatch(PaymentAction(false));
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Thanks ${capitalize(
            user[0].name
          )} for ordering 🤗`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Your order has been confirmned with the Order id: `}
          <strong>${orderId}</strong>
          {` wait for few minutes the order is on the way 🛵`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Track Order
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertMessage message="Your transaction has been done successfully $$" />
    </div>
  );
};

export default PayModal;
