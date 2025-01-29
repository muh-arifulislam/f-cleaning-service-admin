import { useEffect } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
  FETCH_CUSTOMERS,
  FETCH_ORDERS,
  FETCH_USERS,
  FETCH_REVIEWS,
  FETCH_SERVICES,
  FETCH_SHOWCASES,
  SET_ERROR,
  SET_LOADING,
} from "./actionTypes.js";
import reducer, { initialState } from "./reducer.js";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init.js";

// Create the context
const GlobalStoreContext = createContext();

// Create a provider component
const GlobalStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [googleUser, loading, error] = useAuthState(auth);

  const accessToken = localStorage.getItem("accessToken");

  const fetchProtectedData = async (target, type, url) => {
    dispatch({ type: SET_LOADING, target: target });
    try {
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      let data = await response.json();
      if (data.success) {
        dispatch({ type: type, payload: data.data });
      } else {
        throw new Error("Failed to load data...!");
      }
    } catch (err) {
      dispatch({ type: SET_ERROR, target: target, payload: err.message });
    }
  };

  const fetchData = async (target, type, url) => {
    try {
      dispatch({ type: SET_LOADING, target });
      // Fetch data
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        dispatch({ type: type, payload: data.data });
      } else {
        dispatch({
          type: SET_ERROR,
          target,
          payload: "Failed to load data...!",
        });
      }
    } catch (error) {
      dispatch({ type: SET_ERROR, target, payload: error.message });
    }
  };

  useEffect(() => {
    fetchData("services", FETCH_SERVICES, state.apiUrl + "/services");
    fetchData("reviews", FETCH_REVIEWS, state.apiUrl + "/reviews");
    fetchData("showcases", FETCH_SHOWCASES, state.apiUrl + "/showcases");

    if (!loading && googleUser && localStorage.getItem("accessToken")) {
      // fetching customers data when admin user logged in
      fetchProtectedData(
        "customers",
        FETCH_CUSTOMERS,
        state.apiUrl + "/customers"
      );
      // fetching users data when admin user logged in
      fetchProtectedData("users", FETCH_USERS, state.apiUrl + "/users");
      fetchProtectedData("orders", FETCH_ORDERS, state.apiUrl + "/orders");
    }
  }, [googleUser, loading, accessToken]);

  return (
    <GlobalStoreContext.Provider
      value={{
        customers: state.customers,
        orders: state.orders,
        users: state.users,
        services: state.services,
        reviews: state.reviews,
        showcases: state.showcases,
        dispatch: dispatch,
        fetchProtectedData: fetchProtectedData,
        fetchData: fetchData,
        apiUrl: state.apiUrl,
      }}
    >
      {children}
    </GlobalStoreContext.Provider>
  );
};

// Create a custom hook to use the context
const useGlobalStore = () => {
  const context = useContext(GlobalStoreContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { GlobalStoreProvider, useGlobalStore };
