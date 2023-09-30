import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-800 bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url(" + require("../../assets/img/register_bg_2.png") + ")",
              backgroundSize: "100%",
            }}
          ></div>
          <Outlet />
        </section>
      </main>
    </>
  );
}
