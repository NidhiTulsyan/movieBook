import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthForm({ onsubmit, isAdmin, signupKey1 ,showAlert , adminKey, showAlertAdmin}) {
  const [signup, setsignup] = useState(false);

  const [input, setInput] = useState({ name: "", email: "", password: "" });
const navigate = useNavigate();
  const click = () => {
    setsignup(!signup);
    console.log("signup button",signup);
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    onsubmit({ input, signupKey: isAdmin ? false : signup });
    if(isAdmin && adminKey){
      showAlertAdmin("Login Successfull","success");
      navigate("/")
    }
    else{
      showAlertAdmin("Login failed","danger");
      navigate('/admin')  
    }


    // if(!isAdmin && signupKey1){
    //     showAlert("signup Successfull","success");
    // }
    // else{
    //   showAlert("Login failed","danger");  
    // }
  };
  
  return (
    <>
      <h2 className="text-center fw-bold fs-1 my-3 ">
        {isAdmin ? "Login" : signup ? "Login" : "SignUp"}
      </h2>
    <div
        className="card container mx-auto my-5 shadow-lg p-3 mb-5 bg-body rounded"
        style={{ width: "600px" }}
      >
        <form onSubmit={handleSubmit}>
          {!isAdmin && !signup ? (
            <div className="mb-3 mt-4 fs-5">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                value={input.name}
                name="name"
                onChange={handleChange}
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="NameHelp"
              />
            </div>
          ) : (
            ""
          )}
          <div className="mb-3 mt-4 fs-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 mt-4 fs-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={input.password}
              name="password"
              onChange={handleChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-dark mb-4">
            {!isAdmin && (signup ? "Login" : "SignUp")}
            {isAdmin && "Login"}
          </button>
        </form>
        {isAdmin ? (
          ""
        ) : (
          <div>
            <p>
              {isAdmin
                ? ""
                : !signup
                ? "Already has a account? "
                : "Do not have a account? "}
              <button className="btn btn-outline-dark btn-sm" onClick={click}>
                {!signup ? "Login" : "SignUp"}
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
