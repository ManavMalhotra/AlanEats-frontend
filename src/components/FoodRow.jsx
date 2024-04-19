import React from "react";
import "./css/FoodRow.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FoodRow = ({ type }) => {
  const [foodItems, setFoodItems] = useState([]);

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  const getAllFoodItems = () => {
    axios
      .get("https://food-app-backend-bdm8.onrender.com/api/food")
      .then((res) => {
        setFoodItems(res.data.data);
      });
  };

  useEffect(() => {
    getAllFoodItems();
  }, []);

  let addToCart = async (foodId) => {
    try {
      await axios
        .post("https://food-app-backend-bdm8.onrender.com/api/user/cart", {
          food: foodId,
          user: user[0]._id.trim(),
        })
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            alert("Item added to cart");
          }
        });
      // document.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(foodItems);

  return (
    <div className="py-4 md:px-8">
      <h1>{type.toUpperCase()}</h1>
      {/* <div className="foodRow">
        {foodItems.map(
          (foodItem) =>
            foodItem.type == type && (
              <ProductCard
                foodItem={foodItem}
                addToCart={addToCart}
                user={user}
              />
            )
        )}
      </div> */}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        // className=""
        containerClass="container-with-dots"
        // dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        // itemClass="carousel-item-padding-40-px"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        itemAriaLabel="item-card"
      >
        {foodItems.map(
          (foodItem) =>
            foodItem.type === type && (
              <ProductCard
                key={foodItem._id}
                foodItem={foodItem}
                addToCart={addToCart}
                user={user}
              />
            )
        )}
      </Carousel>
    </div>
  );
};

export default FoodRow;
