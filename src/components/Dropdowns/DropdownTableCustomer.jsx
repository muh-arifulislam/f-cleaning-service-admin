import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";

import ModalConfirmation from "../Modals/ModalConfirmation";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_CUSTOMERS } from "../../store/actionTypes";

const DropdownTableCustomer = ({ customer, googleUser }) => {
  const { customers, dispatch, apiUrl } = useGlobalStore();
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
          className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 ${
            customer.status ? "pointer-events-none" : " pointer-events-auto"
          }`}
          onClick={(e) => {
            setDropdownPopoverShow(false);
            e.preventDefault();
          }}
        >
          Action One
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
          Action two
        </a>
      </div>
      <ModalConfirmation
        isOpen={modalIsOpen}
        closeModal={closeModal}
        action={() => {}}
      />
    </>
  );
};

export default DropdownTableCustomer;
