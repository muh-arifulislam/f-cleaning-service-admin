import React, { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [signOut, signOutLoading, error] = useSignOut(auth);
  let location = useLocation();
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:9000/login/${user.email}`).then((res) =>
        res.json().then((data) => {
          if (data.accessToken) {
            console.log(data.accessToken);
          } else {
            signOut();
            toast.error("Unauthorized Access !!!!");
          }
        })
      );
    }
  }, [user]);
  if (loading || signOutLoading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
