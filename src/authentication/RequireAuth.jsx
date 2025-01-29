import React, { useEffect, useState } from "react";

import { Navigate, useLocation } from "react-router-dom";
import MainLoader from "../components/Loader/MainLoader";
import { useGlobalStore } from "../store/GlobalStoreContext";
import {
  FETCH_CUSTOMERS,
  FETCH_ORDERS,
  FETCH_USERS,
} from "../store/actionTypes";

const RequireAuth = ({ children }) => {
  const { fetchData, fetchProtectedData, apiUrl } = useGlobalStore();
  const [fetchLoading, setFetchLoading] = useState(false);
  let location = useLocation();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetchProtectedData("customers", FETCH_CUSTOMERS, apiUrl + "/customers");
      fetchProtectedData("users", FETCH_USERS, apiUrl + "/users");
      fetchProtectedData("orders", FETCH_ORDERS, apiUrl + "/orders");
    }
  }, [accessToken]);

  if (fetchLoading) {
    return <MainLoader />;
  }

  if (!accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
