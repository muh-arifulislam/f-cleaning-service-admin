import React, { useEffect, useState } from "react";
import MainLoader from "../components/Loader/MainLoader";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { toast } from "react-toastify";
import { useGlobalStore } from "../store/GlobalStoreContext";

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const { apiUrl } = useGlobalStore();
  const [googleUser, googleLoading, googleError] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  useEffect(() => {
    setFetchLoading(true);
    fetch(`${apiUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data);
          setFetchLoading(false);
        } else {
          setFetchLoading(false);
          throw new Error("failed to load data...!");
        }
      })
      .catch((error) => toast.error(error.message));
  }, [googleUser]);
  if (googleLoading || fetchLoading) {
    return (
      <div className="py-[80px] text-center">
        <p className="text-xl font-semibold">loading....</p>
      </div>
    );
  }
  if (user?.role !== "admin") {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
