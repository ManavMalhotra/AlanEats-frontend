import axios from "axios";
import React from "react";
import "./css/productDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "./Review";
import AddReview from "./AddReview";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { capitalize } from "@material-ui/core";
import Checkout from "./Checkout";
const ProductDetail = () => {
  let { foodId } = useParams();
  let [details, setDetails] = useState([]);
  let [ingredients, setIngredients] = useState([]);
  let [reviewData, setReviewData] = useState([]);
  let reviewsList = [];
  const [user, setUser] = useState("");
  useEffect(() => {
    let userCredentials = localStorage.getItem("user logged in");
    let user = JSON.parse(userCredentials);
    setUser(user);
    console.log(user);
  }, []);

  let addToCart = async () => {
    try {
      await axios.post(
        "https://food-app-backend-bdm8.onrender.com/api/user/cart",
        {
          food: foodId,
          user: user._id,
        }
      );
      // document.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  let getFoodDetails = () => {
    axios
      .get(`https://food-app-backend-bdm8.onrender.com/api/food/${foodId}`)
      .then((res) => {
        setDetails(res.data.data);
        setIngredients(res.data.data.ingredients);
        reviewsList = res.data.data.reviews;
      })
      .then(async () => {
        let arr = await getReview();
        setReviewData(arr);
      });
  };

  useEffect(() => {
    getFoodDetails();
  }, [foodId]);

  let getReview = async () => {
    try {
      let arr = [];
      arr = await Promise.all(
        reviewsList.map(async (id) => {
          let res = await axios.get(
            `https://food-app-backend-bdm8.onrender.com/api/review/${id}`
          );
          return res.data.data;
        })
      );
      return arr;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFoodDetails();
  }, []);

  return (
    <div className="px-8 py-8 text-center md:px-28 md:mx-auto">
      <div
        className="flex flex-wrap gap-4 px-4 py-8 rounded-lg shadow-lg md:px-16"
        style={{
          backgroundColor: "#f7f7f7",
          borderRadius: "20px",
          backgroundShadow: "0px 0px 10px 0px #000000",
        }}
      >
        {/* Image and Price*/}
        <div className="flex flex-wrap flex-1 px-8 py-8 border rounded-lg md:gap-16 justify-normal md:flex-nowrap">
          <img
            src={details.image_url}
            alt="food"
            className="w-full rounded-lg h-60 md:w-96 md:h-64"
          />
          <div className="flex flex-col justify-between flex-1 gap-4 mt-4 md:items-center md:gap-16 md:flex-row ">
            <div>
              <h3 className="text-3xl font-bold">{details.label}</h3>
              <h3 className="text-xl font-medium">{`₹${details.price}`}</h3>
            </div>
            <div className="flex flex-wrap gap-4 px-4 py-2 border rounded-full cursor-pointer addToCart lg:flex-nowrap">
              <h1 className="text-xl font-semibold text-red-500">
                Add to Cart
              </h1>
              <AddShoppingCartIcon
                className="text-3xl text-red-500 cursor-pointer hover"
                onClick={() => {
                  addToCart();
                }}
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="flex-2" style={{}}>
          <h1 className="my-4 text-3xl font-semibold">Ingredients</h1>
          <div className="flex flex-wrap items-center justify-start">
            {ingredients.map((ingredient) => (
              <div
                className="flex flex-col items-center mx-4 my-2 rounded-full"
                key={ingredient._id}
                style={{}}
              >
                <img
                  src={ingredient.ingredient_Image}
                  alt="ingredients"
                  className="w-16 h-16 bg-transparent rounded-full md:h-24 md:w-24 "
                />
                <h4 className="text-xl font-medium">
                  {capitalize(ingredient.description)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h1 className="review_heading">Customer Reviews</h1>
      <div className="reviews">
        <div className="addReview_container">
          <AddReview itemDetails={details} />
        </div>
        <div className="review_container">
          {reviewData.map((review) => {
            return <Review reviewDetails={review} key={review._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
