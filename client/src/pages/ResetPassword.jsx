import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) =>{
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Website Logo"
        className="absolute left-4 top-4 w-20 sm:left-8 sm:top-6 sm:w-28 lg:w-32 cursor-pointer"
      />

      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email address
        </p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.mail_icon} alt="" className="w-3 h-3" />
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
          Submit
        </button>
      </form>

      {/* OTP input Form */}

      <form
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6 digit code sent to your email id
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
          Verify email
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
