import React from "react";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

// images
import icon from "../../assets/icons/spray.svg";

const CardService = ({ service }) => {
  return (
    <div className="px-[30px] py-[60px] rounded-md shadow-xl text-center select-none bg-white">
      <h1 className="text-2xl font-semibold mb-[28px]">{service?.title}</h1>
      <div className="bg-blue-700 w-[125px] h-[125px] flex justify-center items-center rounded-full mx-auto">
        <img className="w-[48px] h-[48px]" src={icon} alt="" />
      </div>
      <p className="my-[28px]">{service?.description1?.slice(0, 125)}...</p>
      <Link
        to={`/services/${service._id}`}
        className="inline-flex items-center gap-2 transition-all ease-out duration-300 hover:gap-1"
      >
        <span>
          <BsFillArrowRightCircleFill />
        </span>
        <span>READ MORE</span>
      </Link>
    </div>
  );
};

export default CardService;
