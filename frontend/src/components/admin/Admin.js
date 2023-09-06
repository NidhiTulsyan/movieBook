import React, { useState } from "react";
import AuthForm from "../auth/AuthForm";
import { sendAdminLogin } from "../../api-helpers-axios/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";


function Admin(props) {
  const {showAlert} = props;
  const [key,setkey] = useState();

  const dispatch = useDispatch();
  const onResReceived = (data)=>{
    console.log(data)
    dispatch(adminActions.login())
    localStorage.clear();
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("adminToken",data.token);
    setkey(data.success)
    console.log("admin key",key);


  }
  const getData = (data) => {
    console.log("from Admin: ", data);
    sendAdminLogin(data.input)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onsubmit={getData} isAdmin={true} showAlertAdmin={showAlert} adminKey={key}/>
      {/* <AuthForm  /> */}
    </div>
  );
}

export default Admin;
