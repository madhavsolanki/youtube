import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

axios.defaults.withCredentials = true;

export const AppConntextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL ||  "http://localhost:5500/api/v1"
  const [isLoggedin, setLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/auth/is-auth`)
      if(data.success){
        setLoggedin(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAuthState();
  },[])

  const getUserData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/user/data`)
      data?.success ?  setUserData(data?.userData): toast.error(data?.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    backendUrl,
    isLoggedin,
    setLoggedin,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}