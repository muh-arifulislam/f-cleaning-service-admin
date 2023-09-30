import React from "react";
import { Outlet } from "react-router-dom";

// layout view
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeaderStats from "./HeaderStats";

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <Navbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full z-50 -m-5">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
