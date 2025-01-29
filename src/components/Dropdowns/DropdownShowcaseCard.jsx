import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";

// components
import ModalConfirmation from "../Modals/ModalConfirmation";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_SHOWCASES } from "../../store/actionTypes";

const DropdownShowcaseCard = ({
  showcase,
  googleUser,
  setViewShowcaseImg,
  openModalView,
}) => {
  const { showcases, dispatch, apiUrl } = useGlobalStore();
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
    const id = toast.loading("Showcase is deleting...");

    fetch(`${apiUrl}/showcases/${showcase._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setDropdownPopoverShow(false);
          const filteredShowcases = showcases.data.filter(
            (item) => item._id !== showcase._id
          );
          dispatch({ type: FETCH_SHOWCASES, payload: filteredShowcases });

          toast.update(id, {
            render: "Showcase successfully deleted.",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(id, {
            render: "Failed to delete showcase...!",
            type: "error",
            isLoading: false,
            closeButton: true,
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      })
      .catch((error) =>
        toast.update(id, {
          render: "Failed to delete showcase...!",
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: 3000,
          hideProgressBar: false,
        })
      );
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
          setViewShowcaseImg(`${showcase.img}`);
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
          onClick={(e) => {
            e.preventDefault();
            openModalView();
            setDropdownPopoverShow(false);
          }}
        >
          View Showcase
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
          Remove Showcase
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
