import React from "react";
import { Avatar } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./css/Review.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Review = ({ reviewDetails }) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const getUserData = async () => {
    let userData;
    try {
     userData = await axios.get(
       `/api/user/${reviewDetails.user}`
     );
      setUserName(userData.data.user.name);
      setUserImage(userData.data.user.userImage);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="review_data">
      <div className="user_details">
        <Avatar src={userImage} />
        <p>{userName}</p>
      </div>
      <div className="food_rating">
        <Rating readOnly value={reviewDetails.rating} precision={0.5} />
        <span className="time_stamp">{new Date(reviewDetails.createdAt).toLocaleDateString()}</span>
      </div>
      <p>{reviewDetails.description}</p>
    </div>
  );
};

export default Review;
