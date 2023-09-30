import React, { useState } from "react";
import { Link } from "react-router-dom";

// images
import image from "../../assets/images/house5-620x672.jpg";

const CardShowcase = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="relative"
    >
      <img className="max-w-full h-auto" src={image} alt="" />
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#14287be6] flex items-center justify-center transition-all ease-out duration-500 ${
          hover ? " visible opacity-100 " : "invisible opacity-0"
        }`}
      >
        <div>
          <Link className="text-white text-xl font-semibold" to="/">
            House Cleaning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
