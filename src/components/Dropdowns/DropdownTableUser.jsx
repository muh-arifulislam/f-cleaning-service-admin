import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";

// components
import ModalConfirmation from "../Modals/ModalConfirmation";
import useModal from "../../hooks/useModal";

const DropdownTableUser = ({ user, users, setUsers }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { modalIsOpen, setModalIsOpen, closeModal } = useModal(false);
  const removeUsers = () => {
    fetch(`http://localhost:9000/user/${user._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const filteredUsers = users.filter((item) => item._id !== user._id);
          setUsers(filteredUsers);
          toast.success("successfully deleted.");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
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
          "bg-white text-base z-50 absolute top-0 left-3 translate-x-[-100%] translate-y-[20%]  py-2 list-none text-center rounded shadow-lg min-w-48 max-h-48 overflow-y-auto mb-2"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Modify Customer
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
          Remove Customer
        </a>
      </div>
      <ModalConfirmation
        isOpen={modalIsOpen}
        closeModal={closeModal}
        action={removeUsers}
      />
    </>
  );
};

export default DropdownTableUser;
