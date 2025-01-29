import React from "react";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";

// components

import DropdownTableCustomer from "../Dropdowns/DropdownTableCustomer";
import TableLoader from "../Loader/TableLoader";
import ButtonRefresh from "../Buttons/ButtonRefresh";
import { FaCircle, FaUser } from "react-icons/fa";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {
  FETCH_CUSTOMERS,
  SET_ERROR,
  SET_LOADING,
} from "../../store/actionTypes";
import CardTableError from "./CardTableError";
import dayjs from "dayjs";

export default function CardTableCustomers({ color }) {
  const { customers, dispatch, apiUrl } = useGlobalStore();
  const [googleUser, googleLoading, googleRrror] = useAuthState(auth);
  const { modalIsOpen, openModal, closeModal } = useModal(false);
  const handleRefresh = () => {
    dispatch({ type: SET_LOADING, target: "customers" });
    fetch(`${apiUrl}/customers`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: FETCH_CUSTOMERS, payload: data.data });
        } else {
          throw new Error("Failed to load customers...!");
        }
      })
      .catch((error) =>
        dispatch({ type: SET_ERROR, target: "customers", payload: error })
      );
  };
  if (customers.loading) {
    return <TableLoader />;
  }
  if (customers.error) {
    return <CardTableError error={customers.error} />;
  }

  let content = (
    <>
      {customers?.data
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((customer) => (
          <tr key={customer._id} className="font-semibold border-b">
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <FaUser className="text-lg" />
                <span>{customer.name}</span>
              </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {customer.phone}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {customer.email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs flex-wrap p-4 ">
              {customer.address}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {dayjs(customer.createdAt).format("DD/MM/YYYY, h:mm A")}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {customer?.orders?.length}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right relative">
              <DropdownTableCustomer
                customer={customer}
                googleUser={googleUser}
              />
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
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
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
                Customers
              </h3>
            </div>
            <div>
              <ButtonRefresh onClick={handleRefresh} />
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
                  Address
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
                  Orders
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
            <tbody>{customers?.loading ? <TableLoader /> : content}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTableCustomers.defaultProps = {
  color: "light",
};

CardTableCustomers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
