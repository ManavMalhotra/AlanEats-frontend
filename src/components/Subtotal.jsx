import React from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { PayAction } from "../redux/actions/payAction";
import "./css/Subtotal.css";

const Subtotal = ({ price, items, setShowPay }) => {
  const dispatch = useDispatch();
  
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={() => (
          <>
            <p>
              Subtotal ({items} items): <strong>₹{price}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalText={2}
        value="0"
        displayType="text"
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button
        onClick={() => {
          setShowPay(true);
          dispatch(PayAction(true));
        }}
        className="subtotal_button"
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default Subtotal;
