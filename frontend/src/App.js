import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Movies from "./components/movies/Movies";
import HomePage from "./components/HomePage";
import Admin from "./components/admin/Admin";
import Auth from "./components/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState,  } from "react";
import { adminActions, userActions } from "./store";

import Booking from "./booking/Booking";
import UserProfile from "./profile/UserProfile";
import AddMovies from "./components/movies/AddMovies";
import AdminProfile from "./profile/AdminProfile";
import Alert from "./Alert";

export default function App() {
  const dispatch = useDispatch(); 
 
const [alert,setAlert] = useState(null);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("Admin ", isAdminLoggedIn);
  console.log("User ", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  

  }, []);


  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      types:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }

  return (
    <div>
  
      <Header />
      <Alert alert={alert}/>
      <Routes>
        <Route path="/" element={<HomePage showAlert={showAlert}/>} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/admin" element={<Admin showAlert={showAlert}/>} />
        <Route path="/auth" element={<Auth showAlert={showAlert}/>} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/add" element={<AddMovies />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    
    </div>
  );
}



