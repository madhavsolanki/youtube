import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/auth/register`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
        });
        if (data.success) {
          toast.success(data.message);
          setLoggedin(true);
          getUserData();
          navigate("/");
          console.log("Registration attempt with:", {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
          });
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        if (data.success) {
          toast.success(data.message);
          setLoggedin(true);
          getUserData();
          navigate("/");
          console.log("Login attempt with:", {
            email: formData.email,
            password: formData.password,
          });
        } else {
          toast.error(error.message);
        }
      }
      // Clear all fields after logging
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo_icon}
        alt="Website Logo"
        className="absolute left-4 top-4 w-20 sm:left-8 sm:top-6 sm:w-28 lg:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-center mb-2 sm:mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <form
          className="space-y-3 sm:space-y-4 mt-8"
          onSubmit={handleFormSubmit}
        >
          {state === "Sign Up" && (
            <>
              {/* Responsive Name Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 w-full px-4 py-2 rounded-full bg-[#333A5C]">
                  <img src={assets.person_icon} alt="" className="w-4 sm:w-5" />
                  <input
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="bg-transparent outline-none text-white text-xs sm:text-sm w-full"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 w-full px-4 py-2 rounded-full bg-[#333A5C]">
                  <img src={assets.person_icon} alt="" className="w-4 sm:w-5" />
                  <input
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="bg-transparent outline-none text-white text-xs sm:text-sm w-full"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              {/* Username Field */}
              <div className="flex items-center gap-2 w-full px-4 py-2 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="" className="w-4 sm:w-5" />
                <input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="bg-transparent outline-none text-white text-xs sm:text-sm w-full"
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div className="flex items-center gap-2 w-full px-4 py-2 rounded-full bg-[#333A5C]">
                <img src={assets.call_icon} alt="" className="w-3 sm:w-4" />
                <input
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="bg-transparent outline-none text-white text-xs sm:text-sm w-full"
                  type="tel"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="flex items-center gap-2 w-full px-4 py-2 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" className="w-4 sm:w-5" />
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-transparent outline-none text-white text-xs sm:text-sm w-full"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center gap-2 w-full px-4 py-2 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" className="w-4 sm:w-5" />
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-transparent outline-none text-white text-xs sm:text-sm w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-indigo-400 hover:text-indigo-300 text-xs sm:text-sm cursor-pointer mb-2 sm:mb-3"
            >
              Forgot password?
            </p>
          )}

          <button className="w-full py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-medium transition-colors duration-200">
            {state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs sm:text-sm mt-4 sm:mt-5">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
