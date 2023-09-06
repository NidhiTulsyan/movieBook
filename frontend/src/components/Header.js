import React, { useEffect, useState } from "react";
import "./Search.css";
import { getAllMovies } from "../api-helpers-axios/api-helpers.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

export default function Header() {
  const [value, setValue] = useState("");
  const [movie,setMovie] = useState([]);

  const dispatch = useDispatch(); 
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const onhanges = (e) => {
    setValue(e.target.value);
  };
  const onsubmits = (val) => {
    setValue(val);
    // console.log(val);
  };
  useEffect(()=>{
    getAllMovies().then((data)=>setMovie(data.movies));
  },[])
  const logout=(isUser)=>{
dispatch(isUser?userActions.logout():adminActions.logout());
  }

  

  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:"rgb(16, 143, 165)"}}>
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          NCinemas
        </Link>

        <div className="mx-5" style={{ width: "auto" }}>
          <div style={{float:"left"}}>
            <input
              type="text"
              className="form-control ms-5"
              aria-label="Search"
              value={value}
              onChange={onhanges}
              style={{float:"right",marginRight:'5px'}}
              list="movieList"
            />
            <datalist id="movieList">
            {movie && movie
                .filter((item) => {
                  const searchText = value.toLowerCase();
                  const movie = item.title.toLowerCase();
                  return (
                    searchText &&
                    movie.startsWith(searchText) &&
                    movie !== searchText
                  );
                })
                .map((items,index) => (
                  <option 
                    onClick={() => {
                      onsubmits(items.title);
                    }}
                    value={items.title}
                    key={index}
                    >
                  </option>
                ))}
            </datalist>
          </div>

          <span style={{ float: "left" }}>
            <button
              className="btn btn-outline-dark me-5"
              type="button"
              onClick={() => {
                onsubmits(value);
              }}
            >
              Search
            </button>
          </span>
        </div>

        <div className="d-flex ">
          <div
            className=" collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/movies">
                  Movies
                </Link>
              </li>
              {!isAdminLoggedIn && !isUserLoggedIn &&
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Auth
                </Link>
              </li>
              </>
              }
              {isUserLoggedIn &&(
                <>
                <li className="nav-item">
                <Link className="nav-link" to="/user" >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={()=>logout(true)}>
                  Logout
                </Link>
              </li>
                </>
              )}
              {isAdminLoggedIn && (
                <>
                <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={()=>logout(false)}>
                  Logout
                </Link>
              </li>
                </>
              )}
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

 
