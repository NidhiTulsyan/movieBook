import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { sendUserSignupLogin } from "../../api-helpers-axios/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";

function Auth(props) {
  const {showAlert} = props;
  const dispatch = useDispatch();
  const [key,setKey] = useState();

  const onResReceived = (data) => {
    console.log(data);
    console.log("success:", data.success);
    dispatch(userActions.login());
    localStorage.clear();
    localStorage.setItem("userId", data.id)

    setKey(data.success)
    
  };
  const getData = (data) => {
    console.log("from auth: ", data);
    
    sendUserSignupLogin(data.input, data.signupKey)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onsubmit={getData} isAdmin={false} signupKey1={key} showAlert={showAlert}/>
      {/* <AuthForm /> */}
    </div>
  );
}

export default Auth;
