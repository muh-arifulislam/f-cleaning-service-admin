import React from "react";

const BackdropLoader = ({ isOpen, closeModal }) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  return (
    <div className={modalClasses}>
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container  w-full lg:md:max-w-lg max-w-xs mx-auto  z-50 flex justify-center">
        <div className="relative">
          <div className="relative">
            <span className="loader"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackdropLoader;
