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

  const removeCustomers = () => {
    fetch(`${apiUrl}/customers/${customer._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const filteredCustomers = customers?.data.filter(
            (item) => item._id !== customer._id
          );
          dispatch({ type: FETCH_CUSTOMERS, payload: filteredCustomers });
          toast.success("successfully deleted.");
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCustomer = () => {
    const doc = { ...customer, status: true };
    fetch(`${apiUrl}/customers/${customer._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(doc),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledgement) {
          const filteredCustomers = customers?.data.filter(
            (item) => item._id !== customer._id
          );
          dispatch({
            type: FETCH_CUSTOMERS,
            payload: [...filteredCustomers, data.data],
          });
          toast.success("successfully updated the status.");
        }
      });
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
            updateCustomer();
          }}
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
        action={removeCustomers}
      />
    </>
  );
};

export default DropdownTableCustomer;
