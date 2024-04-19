import "./App.css";
// import alanBtn from '@alan-ai/alan-sdk-web';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import AppWrapper from "../src/AppWrapper";
import Navbar from "./components/Navbar";
import FoodRow from "./components/FoodRow";
import { Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import MainImage from "./components/MainImage";
import Payment from "./components/Payment";
import { useDispatch, useSelector } from "react-redux";
// import { PayAction } from "./redux/actions/payAction";
import Admin from "./components/Admin";
import ErrorPage from "./components/ErrorPage";
// import { PaymentAction } from "./redux/actions/payAction";
import PayModal from "./components/PayModal";
import Tracker from "./components/Tracker";

// if (!userCredentials) {
// localStorage.setItem("user logged in", JSON.stringify([{ email: null }]));
// }

let App = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);
  const orderId = JSON.parse(localStorage.getItem("orderId"));

  // const [alanInstance, setAlanInstance] = useState(null);
  const { totalPrice } = useSelector((state) => state.pay);

  return (
    <Switch>
      <Route exact path="/">
        <Navbar />
        <MainImage />
        <FoodRow type="Breakfast" />
        <FoodRow type="Lunch" />
        <FoodRow type="Snacks" />
        <Footer />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/productDetail/:foodId">
        <Navbar />
        <ProductDetail />
        <Footer />
      </Route>
      <Route exact path="/checkout">
        <Checkout />
        <Footer />
      </Route>
      <Route exact path="/checkout/payment">
        <Navbar />
        <Payment price={totalPrice} />
        <Footer />
      </Route>

      {user !== null && user[0]?.email === "manavmalhotrafrnd4u@gmail.com" ? (
        <Route exact path="/admin" component={Admin} />
      ) : (
        <Route path="/admin" component={ErrorPage} />
      )}

      {orderId && user !== null ? (
        <Route exact path="/foodtracker">
          <Navbar />
          <Tracker />
          <Footer />
        </Route>
      ) : (
        <Route path="/foodtracker" component={ErrorPage} />
      )}

      <Route exact path="/order/payment/success">
        <PayModal orderId={orderId} />
      </Route>
    </Switch>
  );
};

export default App;
