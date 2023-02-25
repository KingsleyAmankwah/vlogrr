import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

// import { IoMoon, IoSunny } from "react-icons/io5";
import Search from "./Search";
import { getAuth } from "firebase/auth";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white">
      <div className="py-4 px-3 flex items-center z-40">
        {/* Brand */}
        <div className="flex items-center mr-2">
          <div className="flex justify-center items-center h-[48px] min-w-[123px] rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500">
            <p className="text-white font-bold text-2xl tracking-wider">
              Vlogrr
            </p>
          </div>
        </div>
        {/* main */}
        <div className="hidden md:flex justify-end items-center w-[100%]">
          <Search />
          <UserProfile />
        </div>

        <div
          className="block ml-auto md:hidden cursor-pointer"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
const UserProfile = () => {
  const [isMenu, setIsMenu] = useState(false);

  const showMenu = () => {
    setIsMenu((menu) => !menu);
  };

  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4 group relative">
      <div
        // onClick={showMenu}
        className="flex flex-col items-end font-sans cursor-pointer"
      >
        <p className="text-3xl w-9 hidden lg:flex">
          <AiOutlineAppstoreAdd />
        </p>
      </div>
      <div
        className="w-10 h-10 flex items-center justify-center border border-active-bg rounded-full cursor-pointer"
        onClick={showMenu}
      >
        <img
          src="https://akingsley.netlify.app/images/p3.jpg"
          alt="User profile"
          className="w-[90%] h-[90%] border border-active-bg rounded-full"
        />
        {isMenu && (
          <div className=" bg-white rounded-lg shadow-xl gap-0  flex-col absolute right-0 z-50 top-14 p-2 font-sans flex min-w-[12rem]">
            {/* <div
              className="text-active flex gap-2 items-center "
              onClick={showMenu}
            >
              <FaUserLock className="text-lg" />
              <p>Profile</p>
            </div> */}

            <div className="w-full h-[2px] my-2 bg-active-bg"></div>
            <Link to="/profile">
              <div className="flex items-center gap-2 text-active cursor-pointer hover:bg-active-bg p-2">
                <FaUserLock className="text-lg" />
                <p>Profile</p>
              </div>
            </Link>

            <div>
              <Link to="/settings">
                <div className="flex items-center gap-2 text-active cursor-pointer hover:bg-active-bg p-2">
                  <FiSettings className="text-lg" />
                  <p>Settings</p>
                </div>
              </Link>
            </div>

            <div
              className="flex items-center gap-2 text-active cursor-pointer hover:bg-active-bg p-2"
              onClick={onLogout}
            >
              <BiLogOutCircle className="text-lg" />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
