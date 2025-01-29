import React from "react";
import PropTypes from "prop-types";

// components
import TableLoader from "../Loader/TableLoader";
import ButtonRefresh from "../Buttons/ButtonRefresh";
import { FaUser } from "react-icons/fa";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_ORDERS, SET_ERROR, SET_LOADING } from "../../store/actionTypes";
import CardTableError from "./CardTableError";
import dayjs from "dayjs";
import DropdownTableOrder from "../Dropdowns/DropdownTableOrder";

export default function CardTableOrders({ color }) {
  const { orders, dispatch, apiUrl } = useGlobalStore();
  const handleRefresh = () => {
    dispatch({ type: SET_LOADING, target: "orders" });
    fetch(`${apiUrl}/orders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: FETCH_ORDERS, payload: data.data });
        } else {
          throw new Error("Failed to load customers...!");
        }
      })
      .catch((error) =>
        dispatch({ type: SET_ERROR, target: "orders", payload: error })
      );
  };
  if (orders.loading) {
    return <TableLoader />;
  }
  if (orders.error) {
    return <CardTableError error={orders.error} />;
  }

  let content = (
    <>
      {orders?.data
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((order) => (
          <tr key={order._id} className="font-semibold border-b">
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <FaUser className="text-lg" />
                <span>{order.name}</span>
              </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {order.phone}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {order.email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs flex-wrap p-4 ">
              {order.address}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {dayjs(order.createdAt).format("DD/MM/YYYY, h:mm A")}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {order?.status}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right relative">
              <DropdownTableOrder order={order} />
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
                Orders
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
            <tbody>{orders?.loading ? <TableLoader /> : content}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTableOrders.defaultProps = {
  color: "light",
};

CardTableOrders.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
