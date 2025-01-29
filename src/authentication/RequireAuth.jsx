import React, { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import { toast } from "react-toastify";
import MainLoader from "../components/Loader/MainLoader";
import { useGlobalStore } from "../store/GlobalStoreContext";
import { FETCH_CUSTOMERS, FETCH_USERS } from "../store/actionTypes";

const RequireAuth = ({ children }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  let location = useLocation();

  const accessToken = localStorage.getItem("accessToken");

  if (fetchLoading) {
    return <MainLoader />;
  }

  if (!accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
