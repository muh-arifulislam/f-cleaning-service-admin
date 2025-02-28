import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";

import ModalConfirmation from "../Modals/ModalConfirmation";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_REVIEWS } from "../../store/actionTypes";

const DropdownTableReview = ({ review, googleUser }) => {
  const { reviews, dispatch, apiUrl } = useGlobalStore();
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

  const removeReview = () => {
    fetch(`${apiUrl}/reviews/${review._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filteredReviews = reviews?.data?.filter(
            (item) => item._id !== review._id
          );
          dispatch({ type: FETCH_REVIEWS, payload: filteredReviews });
          toast.success("successfully deleted.");
        } else {
          throw new Error("Failed to remove review...!");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const updateReview = () => {
    const doc = { ...review, status: !review.status };
    fetch(`${apiUrl}/reviews/${review._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(doc),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filteredReviews = reviews?.data?.filter(
            (item) => item._id !== review._id
          );
          dispatch({
            type: FETCH_REVIEWS,
            payload: [data.data, ...filteredReviews],
          });
          toast.success("successfully updated the status.");
        } else {
          throw new Error("Failed to update review...!");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
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
          "bg-white text-base z-50 absolute top-0 left-3 translate-x-[-100%] translate-y-[20%]  py-2 list-none text-start rounded shadow-lg min-w-48 max-h-48 overflow-y-auto mb-2"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            updateReview();
            setDropdownPopoverShow(false);
          }}
        >
          Modify Status
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
          Remove Review
        </a>
      </div>
      <ModalConfirmation
        isOpen={modalIsOpen}
        closeModal={closeModal}
        action={removeReview}
      />
    </>
  );
};

export default DropdownTableReview;
