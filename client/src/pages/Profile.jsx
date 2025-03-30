import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Profile = () => {

  const { userData } = useContext(AppContext);

  return (
    <div >
      <Navbar />
      <div className="flex justify-center items-center mt-30">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg text-center">
          <div className="flex flex-col items-center">
            <img
              src={assets.profile_placeholder}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
            />
            <h2 className="text-xl font-semibold mt-4">John Doe</h2>
            <p className="text-gray-500">@johndoe</p>
          </div>
          <div className="mt-6 space-y-2 text-left">
            <p className="text-gray-700"><strong>First Name:</strong> John</p>
            <p className="text-gray-700"><strong>Last Name:</strong> Doe</p>
            <p className="text-gray-700"><strong>Email:</strong> johndoe@example.com</p>
            <p className="text-gray-700"><strong>Phone:</strong> +123 456 7890</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Update Profile Picture</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;