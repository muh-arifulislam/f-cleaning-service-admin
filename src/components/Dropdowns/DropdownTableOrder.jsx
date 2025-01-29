import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";

import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FETCH_ORDERS } from "../../store/actionTypes";
import { useForm } from "react-hook-form";

const DropdownTableOrder = ({ order }) => {
  const { orders, dispatch, apiUrl } = useGlobalStore();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    reset();
    setDropdownPopoverShow(false);

    fetch(`${apiUrl}/orders/${order._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filteredOrders = orders?.data?.filter(
            (item) => item._id !== order._id
          );
          dispatch({
            type: FETCH_ORDERS,
            payload: [data.data, ...filteredOrders],
          });
          toast.success("successfully updated the status.");
        } else {
          throw new Error("Failed to update order status...!");
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
          if (order.status !== "completed") {
            setDropdownPopoverShow(!dropdownPopoverShow);
          }
        }}
      >
        <FaEllipsisV />
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 absolute top-0 left-3 translate-x-[-100%] translate-y-[20%]  py-2 list-none text-center rounded shadow-lg min-w-[200px] max-h-48 overflow-y-auto mb-2 p-1"
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            defaultValue={"accepted"}
            {...register("status", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled>Update Status</option>
            <option value="accepted">Accepted</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
            <option value="on-halt">Halted</option>
            <option value="canceled">Canceled</option>
          </select>
          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full text-sm border bg-blue-500 text-white py-1"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DropdownTableOrder;
