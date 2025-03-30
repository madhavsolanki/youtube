import React, { useCallback, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={ assets.header_img}
        alt="header"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData?.username : ""}!
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />{" "}
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        <div className="flex justify-center items-center gap-3">
          <span>Welcome to</span>
          <img src={assets.logo_icon} alt="" className="w-35 sm:w-32" />
        </div>
      </h2>


      <p className="mb-8 max-w-md">
        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptate. Cum sociis natoque penat non proident et non proident et
        euismod
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer">
        Get Started
      </button>
    </div>
  );
};

export default Header;
