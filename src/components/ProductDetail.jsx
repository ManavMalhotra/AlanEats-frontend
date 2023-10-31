import axios from "axios";
import React from "react";
import "./css/productDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "./Review";
import AddReview from "./AddReview";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { capitalize } from "@material-ui/core";

const ProductDetail = () => {
  let { foodId } = useParams();
  let [details, setDetails] = useState([]);
  let [ingredients, setIngredients] = useState([]);
  let [reviewData, setReviewData] = useState([]);
  let reviewsList = [];

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  let addToCart = async () => {
    try {
      await axios.post("/api/user/cart", {
        food: foodId,
        user: user[0]._id.trim(),
      });
      document.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  let getFoodDetails = () => {
    axios
      .get(`/api/food/${foodId}`)
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
            `/api/review/${id}`
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
    <>
      <div className="productDetail">
        <div className="my_product">
          <div className="product_detailsInfo">
            <h3>{details.label}</h3>
            <h3>{`₹${details.price}`}</h3>
            <div className="addToCart">
              <AddShoppingCartIcon
                onClick={() => {
                  addToCart();
                }}
              />
            </div>
          </div>
          <div className="product_img">
            <img src={details.image_url} alt="product image" />
          </div>
        </div>
        <div className="product_ingredients">
          <div className="ingredient-heading">
            <h1>Ingredients</h1>
          </div>
          <div className="ingredients">
            {ingredients.map((ingredient) => (
              <div className="ingredient-detail" key={ingredient._id}>
                <img src={ingredient.ingredient_Image} alt="ingredient image" />
                <h4>{capitalize(ingredient.description)}</h4>
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
    </>
  );
};

export default ProductDetail;
