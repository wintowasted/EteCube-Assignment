import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="bg-teal-500 w-full h-20">
      <nav className="container px-8  h-full flex justify-between mx-auto items-center">
        <div>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <Link to={"/"}>EteCube</Link>
          </span>
        </div>
        <ul className="flex gap-x-4 md:gap-x-8 text-xs sm:text-sm md:text-md lg:text-lg">
          <li className="hover:text-white">
            <Link to={"/companies"}>Companies</Link>
          </li>
          <li className="hover:text-white">
            <Link to={"/products"}>Products</Link>
          </li>
          <li className="hover:text-white" onClick={logout}>
            <button className="bg-gray-700/40 rounded-2xl px-3 py-[0.15rem] text-xs md:text-sm md:py-1">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
