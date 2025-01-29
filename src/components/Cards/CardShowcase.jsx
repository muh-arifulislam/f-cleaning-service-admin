import React, { useState } from "react";
import { useGlobalStore } from "../../store/GlobalStoreContext";

const CardShowcase = ({ showcase }) => {
  const [hover, setHover] = useState(false);
  const { apiUrl } = useGlobalStore();
  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="relative shadow-md w-full h-[300px]"
    >
      <img
        className="object-cover w-full h-full"
        src={`${showcase.img}`}
        alt=""
      />
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#14287be6] flex items-center justify-center transition-all ease-out duration-500 ${
          hover ? " visible opacity-100 " : "invisible opacity-0"
        }`}
      >
        <div>
          <p className="text-white ">{showcase.title}</p>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
