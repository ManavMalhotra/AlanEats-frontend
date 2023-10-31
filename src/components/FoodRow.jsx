import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "./css/FoodRow.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { capitalize } from "@material-ui/core";

const FoodRow = ({ type }) => {
  let history = useHistory();
  const [foodItems, setFoodItems] = useState([]);
  const [newState, setNewState] = useState([]);

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  const getAllFoodItems = () => {
    axios.get("/api/food").then((res) => {
      if (type === "fast food") {
        setFoodItems(res.data.data);
      } else {
        setNewState(
          res.data.data.filter((item) => {
            if (item.type === type) {
              return item;
            }
          })
        );
        setFoodItems(newState);
      }
    });
  };

  useEffect(() => {
    getAllFoodItems();
  }, [foodItems]);

  return (
    <>
      <h1 className={`${type === "fast food" ? "categoryName" : "category"}`}>{capitalize(type)} </h1>
      <div className="foodRow">
        {foodItems.map((foodItem) => (
          <div className="item-card" key={foodItem._id}>
            <img
              src={foodItem.image_url}
              alt="food item"
              onClick={() => {
                return user
                  ? history.push(`/productDetail/${foodItem._id}`)
                  : alert(
                      "please signin to your account before doing anything"
                    );
              }}
            />
            <div className="product">
              <div className="product-info">
                <h4>{foodItem.label}</h4>
                <h4>₹{foodItem.price}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodRow;
