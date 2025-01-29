import React from "react";
import PropTypes from "prop-types";

// components
import DropdownTableUser from "../Dropdowns/DropdownTableUser";
import ModalAddUser from "../Modals/ModalAddUser";
import CardTableError from "../Cards/CardTableError";
import useModal from "../../hooks/useModal";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {
  SET_LOADING,
  SET_ERROR,
  FETCH_USERS,
} from "../../store/actionTypes.js";
import TableLoader from "../Loader/TableLoader";
import { FaUser } from "react-icons/fa";

export default function CardTableUsers({ color }) {
  const { users, dispatch, apiUrl } = useGlobalStore();
  const [googleUser, googleLoading, googleRrror] = useAuthState(auth);
  const { modalIsOpen, closeModal, openModal } = useModal(false);
  const handleRefresh = () => {
    dispatch({ type: SET_LOADING, target: "users" });
    fetch(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_USERS, payload: data });
      })
      .catch((error) =>
        dispatch({ type: SET_ERROR, target: "users", payload: error.message })
      );
  };
  if (users.loading) {
    return <TableLoader />;
  }
  if (users.error) {
    return <CardTableError error={users.error} />;
  }
  let content = (
    <>
      {users?.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((user) => (
          <tr key={user._id} className="font-semibold border-b">
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <FaUser className="text-lg" />
                <span>{user.name}</span>
              </div>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {user.phone}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {user.email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {user.role}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right relative">
              <DropdownTableUser user={user} googleUser={googleUser} />
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
                Users
              </h3>
            </div>
            <div>
              <button
                onClick={() => handleRefresh()}
                className="bg-slate-200 px-5 py-1 mr-5 font-medium text-md rounded"
              >
                Refresh
              </button>
              <button
                onClick={() => openModal()}
                className="bg-tertiary px-5 py-1 font-medium text-md rounded"
              >
                Add User
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
                  Role
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
            <tbody>{users?.loading ? <TableLoader /> : content}</tbody>
          </table>
        </div>
      </div>
      <ModalAddUser
        isOpen={modalIsOpen}
        closeModal={closeModal}
        googleUser={googleUser}
      />
    </>
  );
}

CardTableUsers.defaultProps = {
  color: "light",
};

CardTableUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
