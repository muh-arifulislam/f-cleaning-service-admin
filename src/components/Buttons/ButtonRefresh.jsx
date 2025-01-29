import React from "react";

const ButtonRefresh = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="bg-slate-200 px-5 py-1 mr-5 font-medium text-md rounded lg:md:my-0 my-3"
    >
      Refresh
    </button>
  );
};

export default ButtonRefresh;
