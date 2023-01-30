import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="w-full bg-gray-600/10 overflow-y-scroll">
        <section className="container px-8 mx-auto h-[calc(100vh-80px)]  ">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default Layout;
