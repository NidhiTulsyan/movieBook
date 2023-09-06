
import React from "react";

function Alert(props) {
  const capitalize = (word)=>{
    if(word==="danger"){
      word="error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return (
    <div  className="mt-3 ">
    {props.alert && <div className={`alert alert-${props.alert.types} alert-dismissible fade show shadow p-3 mb-5 rounded`} role="alert" style={{ maxWidth: "18rem", float: "right", marginRight: "30px" }}>
    <strong>{props.alert.types}: </strong> {props.alert.msg}
  </div>}
    </div>
  );
}

export default Alert;