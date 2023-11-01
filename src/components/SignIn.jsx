import React from "react";
import { Link } from "react-router-dom";
import "./css/SignIn.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userCreator } from "../redux/actions/userActions";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";

const SignIn = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [password, passwordSet] = useState("");
  const [email, emailSet] = useState("");
  let userData = [];

  const handleSignin = async () => {
    history.push(`/`);
    try {
      if (email.length > 0 && password.length > 0) {
        let user = [];
        user = await axios.post(
          "https://food-app-backend-bdm8.onrender.com/api/user/login",
          {
            email: email,
            password: password,
          }
        );
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signin">
      <Link to="/">
        <img src={AlanEatsLogo} className="signin_logo" alt="alan eat" />
      </Link>
      <div className="signin_container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            placeholder="your Email"
            onChange={(e) => emailSet(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            placeholder="**********"
            onChange={(e) => passwordSet(e.target.value)}
          />
          <button
            className="sign_inButton"
            onClick={async () => {
              let user = await handleSignin();
              userData.push(user?.data?.user);
              localStorage.setItem("user logged in", JSON.stringify(userData));
              dispatch(userCreator(true));
            }}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the Alan Eats conditions. Please see our
          Privacy Notice
        </p>
        <Link to="/signup">
          <button className="sign_inRegisterButton">
            Create Your Alan Eats Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
