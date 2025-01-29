import { Navigate, createBrowserRouter } from "react-router-dom";

// layout view
import Main from "../layout/Main/Main";
import AuthLayout from "../layout/AuthLayout/AuthLayout";

// pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/Customers/Customers";
import Reviews from "../pages/Reviews/Reviews";
import Users from "../pages/Users/Users";
import Showcases from "../pages/Showcases/Showcases";
import Login from "../pages/Auth/Login";

import RequireAuth from "../authentication/RequireAuth.jsx";
import RequireAdmin from "../authentication/RequireAdmin.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/admin"} />,
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <Main />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customer",
        element: <Customers />,
      },
      {
        path: "review",
        element: <Reviews />,
      },
      {
        path: "showcase",
        element: <Showcases />,
      },
      {
        path: "user",
        element: (
          <RequireAdmin>
            <Users />
          </RequireAdmin>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default routes;
