import React from "react";
import "./css/SignIn.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import Resizer from "react-image-file-resizer";
import { AlertMessage } from "./AlertMessage";

const SignUp = () => {
  let history = useHistory();

  const [name, nameSet] = useState("");
  const [img, setImg] = useState("");
  const [password, passwordSet] = useState("");
  const [email, emailSet] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const handleSignup = async (e) => {
    // setTimeout(() => {
    // }, 7000);
    try {
      if (
        name.length > 0 &&
        password.length > 0 &&
        email.length > 0 &&
        confirm.length > 0
      ) {
        e.preventDefault();
        const user = await axios.post(
          "/api/user/signup",
          {
            userImage: img,
            name: name,
            email: email,
            password: password,
            confirmPassword: confirm,
          }
        );
        setUserInfo({ ...user.data.user });
        history.push("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateImg = (file) => {
    Resizer.imageFileResizer(
      file, //is the file of the new image that can now be uploaded...
      300, // is the maxWidth of the  new image
      300, // is the maxHeight of the  new image
      "JPEG", // is the compressFormat of the  new image
      50, // is the quality of the  new image
      0, // is the rotatoion of the  new image
      (uri) => {
        setImg(uri);
        console.log(uri);
      }, // is the callBack function of the new image URI
      "base64" // is the output type of the new image
    );
  };

  return (
    <div className="signup">
      <Link to="/">
        <img src={AlanEatsLogo} className="signin_logo" alt="alan eat" />
      </Link>
      <div className="signin_container">
        <h1>Sign-up</h1>
        <form>
          <h5>Username</h5>
          <input
            type="file"
            accept="image/*"
            placeholder="Your Name"
            onChange={(e) => {
              updateImg(e.target.files[0]);
            }}
          />

          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => nameSet(e.target.value)}
          />

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

          <h5>Confirm-Password</h5>
          <input
            type="password"
            placeholder="**********"
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            className="sign_inButton"
            onClick={(e) => {
              handleSignup(e);
            }}
          >
            Sign up
          </button>
        </form>
        {userInfo?.name?.length > 0 ? (
          <AlertMessage message="Account created successfully" />
        ) : null}
        <p>
          By signing-in you agree to the Alan Eats conditions. Please see our
          Privacy Notice
        </p>
      </div>
    </div>
  );
};

export default SignUp;
