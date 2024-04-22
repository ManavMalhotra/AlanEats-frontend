import React from "react";
import "./css/Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCreator } from "../redux/actions/userActions";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import axios from "axios";

const Navbar = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  // console.log(history);

  const [show, handleShow] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [searchFood, setSearchFood] = useState("");

  let userCredentials = localStorage.getItem("user logged in");
  let user = JSON.parse(userCredentials);

  const searchFoodItem = () => {
    let getFood = foodItems.filter((food) => {
      console.log(food.label.includes(searchFood));
      if (food.label.includes(searchFood)) {
        return food;
      }
    });

    if (getFood.length === 0) {
      alert("No result Found...");
      history.push("/");
    } else history.push(`/productDetail/${getFood[0]._id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

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

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to="/">
        <img
          src={AlanEatsLogo}
          alt="alan eat"
          className="w-20 h-20 p-2 rounded-full md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36"
        />
      </Link>

      {/* <div className="nav_search">
        <input
          type="text"
          value={searchFood}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setSearchFood("");
              searchFoodItem();
            }
          }}
          onChange={(e) => setSearchFood(e.target.value)}
          placeholder="Search your fav food item"
        />
        <SearchIcon
          className="nav_searchIcon"
          onClick={() => {
            setSearchFood("");
            searchFoodItem();
          }}
        />
      </div> */}

      <div className="nav_header">
        {user &&
        user[0] !== null &&
        user[0]?.email === "manavmalhotrafrnd4u@gmail.com" ? (
          <div className="adminLink">
            <button
              className="adminBtn"
              onClick={() => {
                history.push("/admin");
              }}
            >
              <img
                className="object-cover object-center w-16 h-16 p-1 rounded-full md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllTESQNMm-IWUp38QV_ubWFe97fa-tSSdrQ&usqp=CAU"
                alt=""
              />
            </button>
          </div>
        ) : null}
        <div
          className="nav_cart"
          onClick={() => {
            history.push("/checkout");
          }}
        >
          <ShoppingBasketIcon className="cursor-pointer cartIcon" />
        </div>

        {!user ? (
          <span
            className="nav_signin"
            onClick={() => {
              history.push("/signin");
            }}
          >
            Sign In
          </span>
        ) : (
          <div className="loggedUser">
            {user[0].userImage ? (
              <img className="user_logo" src={user[0]?.userImage} />
            ) : (
              <div className="w-8 h-8 bg-gray-600 rounded-full" />
            )}
            <div className="loggedUser_info">
              <h4 className="text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                {user[0]?.name}
              </h4>
              <button
                className="text-sm font-semibold text-gray-500 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl hover:text-gray-700"
                onClick={() => {
                  localStorage.removeItem("user logged in");
                  dispatch(userCreator(false));
                  history.push("/signin");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
