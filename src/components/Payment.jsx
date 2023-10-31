import React from "react";
import { useHistory } from "react-router-dom";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import axios from "axios";
import "./css/Payment.css";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderAction,
  PayAction,
  PaymentAction,
} from "../redux/actions/payAction";
import PayModal from "./PayModal";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function Payment(props) {
  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);
  const dispatch = useDispatch();
  const { isPayment } = useSelector((state) => state.pay);
  const history = useHistory();

  if (isPayment) {
    displayRazorpay();
    dispatch(PaymentAction(false));
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:3000/razorpay", {
      method: "POST",
      body: JSON.stringify({
        cartAmount: props.price,
        name: user[0]?.name,
        email: user[0]?.email,
        userId: user[0]?._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((t) => t.json());

    const options = {
      key: __DEV__ ? "rzp_test_oKt4aYMDlmmRMX" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: props.price.toString(), //data.amount.toString(),
      order_id: data.id,
      name: "Order Food",
      description: "Thank you for ordering..",
      image: AlanEatsLogo,
      handler: function (response) {

        <PayModal
          payId={response.razorpay_payment_id}
          orderId={response.razorpay_order_id}
        />;
        dispatch(OrderAction(response.razorpay_order_id));
        localStorage.setItem(
          "orderId",
          JSON.stringify(response.razorpay_order_id)
        );
        axios.put(`/api/user/cart/${user[0]?._id}`).then((res) => {
          dispatch(PayAction(false));
          dispatch(PaymentAction(false));

          createOrder(data.id);
          
          history.push("/order/payment/success");
        });
      },
      // prefill: {
      // 	name:user[0]?.name,
      // 	email: user[0]?.email,
      // 	phone_number: "9213753655"
      // }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const createOrder = async (orderId) => {
    try {
      await axios.post("/api/order", {
        orderId,
        status: "Placed",
        createdAt: Date.now(),
        username: user[0].name,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="Payment">
        <div className="parent">
          {/* left div */}
          <div className="left">
            <img src={AlanEatsLogo} alt="logo" />
          </div>

          {/* right div */}
          <div className="right">
            <h2>Tummy's growling 😣, let's proceed to payment</h2>
            <button
              className="App-link"
              style={{ cursor: "pointer" }}
              onClick={displayRazorpay}
              target="_blank"
              rel="noopener noreferrer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
