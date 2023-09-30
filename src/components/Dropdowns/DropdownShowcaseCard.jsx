import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";

// components
import ModalConfirmation from "../Modals/ModalConfirmation";

const DropdownShowcaseCard = ({ showcase, showcases, setShowcases }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const removeShowcase = () => {
    fetch(`http://localhost:9000/showcase/${showcase._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ img: showcase.img }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setDropdownPopoverShow(false);
          toast.success("successfully deleted showcase");
          const filteredShowcases = showcases.filter(
            (item) => item._id !== showcase._id
          );
          setShowcases(filteredShowcases);
        }
      });
  };

  return (
    <>
      <a
        className="text-white bg-secondary py-3 px-3 rounded-full absolute top-[20px] right-[20px]"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          setDropdownPopoverShow(!dropdownPopoverShow);
        }}
      >
        <FaEllipsisV />
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 absolute top-0 right-0 translate-x-[-60%] translate-y-[20%]  py-2 list-none text-center rounded shadow-lg min-w-48 max-h-48 overflow-y-auto mb-2"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Modify Service
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            setModalIsOpen(true);
            setDropdownPopoverShow(false);
          }}
        >
          Remove Service
        </a>
      </div>
      <ModalConfirmation
        isOpen={modalIsOpen}
        closeModal={closeModal}
        action={removeShowcase}
      />
    </>
  );
};

export default DropdownShowcaseCard;
