import React from 'react';
import Image from "../Images/MainImage.png";
import "./css/MainImage.css";

const MainImage = () => {
    return (
        <div class="mainImage">
             <img src={Image} alt="" />
        </div>
    )
}

export default MainImage
