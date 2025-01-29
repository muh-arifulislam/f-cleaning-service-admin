import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCircle, FaUser } from "react-icons/fa";
import useModal from "../../hooks/useModal";
import dayjs from "dayjs";

// components
import DropdownTableReview from "../Dropdowns/DropdownTableReview";
import ModalShowReview from "../Modals/ModalShowReview";
import ModalAddReview from "../Modals/ModalAddReview";
import CardTableError from "../Cards/CardTableError";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import TableLoader from "../Loader/TableLoader";
import ButtonRefresh from "../Buttons/ButtonRefresh";
import { FETCH_REVIEWS, SET_ERROR, SET_LOADING } from "../../store/actionTypes";

export default function CardTable({ color }) {
  const { reviews, dispatch, apiUrl } = useGlobalStore();
  const [googleUser, googleLoading, googleError] = useAuthState(auth);
  const [review, setReview] = useState("");
  // modal state for ShowContentModal
  const { modalIsOpen, closeModal, openModal } = useModal(false);
  // modal state for ModalReviewAdd
  const {
    modalIsOpen: formModalIsOpen,
    closeModal: formCloseModal,
    openModal: formOpenModal,
  } = useModal(false);
  const handleRefresh = () => {
    dispatch({ type: SET_LOADING, target: "reviews" });
    fetch(`${apiUrl}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: FETCH_REVIEWS, payload: data.data });
        } else {
          throw new Error("Failed to load reviews...!");
        }
      })
      .catch((error) =>
        dispatch({ type: SET_ERROR, target: "reviews", payload: error.message })
      );
  };
  if (reviews.loading) {
    return <TableLoader />;
  }
  if (reviews.error) {
    return <CardTableError error={reviews.error} />;
  }
  let content = (
    <>
      {reviews.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((review) => (
          <tr key={review._id} className="font-semibold border-b">
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <FaUser className="text-lg" />
                <span>{review.name}</span>
              </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {review?.ratings}
            </td>
            <td
              onClick={() => {
                setReview(review?.testimonial);
                openModal();
              }}
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer"
            >
              <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
              {review.testimonial.length > 10
                ? review?.testimonial?.slice(0, 10)
                : review?.testimonial}
              ...
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {review?.phone || "N/A"}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {review?.email || "N/A"}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {dayjs(review.createdAt).format("DD/MM/YYYY, h:mm A")}
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {review?.status ? (
                <>
                  <FaCircle className="inline text-green-500 mr-2" />
                  active
                </>
              ) : (
                <>
                  <FaCircle className="inline text-orange-500 mr-2" />
                  pending
                </>
              )}
            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right relative">
              <DropdownTableReview review={review} googleUser={googleUser} />
            </td>
          </tr>
        ))}
    </>
  );
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Card Tables
              </h3>
            </div>
            <div>
              <ButtonRefresh onClick={handleRefresh} />
              <button
                onClick={() => formOpenModal()}
                className="bg-tertiary px-5 py-1 font-medium text-md rounded"
              >
                Add New Review
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Ratings
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Review
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Phone
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>{reviews?.loading ? <TableLoader /> : content}</tbody>
          </table>
        </div>
      </div>
      <ModalShowReview isOpen={modalIsOpen} closeModal={closeModal}>
        <div className="mt-5">
          <p>"{review}"</p>
        </div>
      </ModalShowReview>
      <ModalAddReview isOpen={formModalIsOpen} closeModal={formCloseModal} />
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
