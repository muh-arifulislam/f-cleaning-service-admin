import React, { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../store/GlobalStoreContext";
import { FaUser } from "react-icons/fa";

const DropdownUser = () => {
  const { apiUrl } = useGlobalStore();
  const [googleUser, googleLoading, googleError] = useAuthState(auth);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [signOut, loading, error] = useSignOut(auth);

  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          setDropdownPopoverShow(!dropdownPopoverShow);
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-slate-400 p-1 bg-white inline-flex items-center justify-center rounded-full ">
            {googleUser?.photoURL ? (
              <img
                alt="user"
                className="w-full h-full rounded-full align-middle border-none shadow-lg"
                src={googleUser?.photoURL}
              />
            ) : (
              <FaUser size={20} />
            )}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 absolute top-[20px] left-0 translate-x-[-80%] translate-y-[20%]  py-2 list-none text-center rounded shadow-lg min-w-48 mb-2 px-5"
        }
      >
        <p
          className={
            "text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-black"
          }
        >
          {googleUser?.displayName || user?.name}
        </p>
        <p
          className={
            "text-sm py-2 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
        >
          {googleUser?.email || user?.email}
        </p>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <div className="flex justify-center py-2">
          <button
            onClick={() => handleSignOut()}
            className="px-8 py-1 bg-tertiary text-lg flex items-center rounded font-semibold"
          >
            <FiLogOut className="fas fa-paint-brush mr-2 text-blueGray-300 text-base" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DropdownUser;
