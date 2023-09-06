import React, { useEffect, useState } from "react";
import MovieCard from "./movies/MovieCard";
import { getAllMovies } from "../api-helpers-axios/api-helpers.js";
import { Link } from "react-router-dom";



export default function HomePage(props) {
  const {showAlert} = props;
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err));
        // showAlert("you are in home page of website","success");
    },[])
    // console.log(movies);
  
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide mt-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item ">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/events/et00072466-avpmzgscvw-landscape.jpg"
              className="d-block w-75 rounded mx-auto "
              alt="barbie poster"
              height={"500px"}
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://www.livemint.com/lm-img/img/2023/07/11/1600x900/F0vbj9-aEAAamWQ_1689062929453_1689062943099.jpg"
              className="d-block w-75 rounded mx-auto"
              alt="omg 2 poster"
              height={"500px"}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.ytimg.com/vi/BwrZfGq1HlQ/maxresdefault.jpg"
              className="d-block w-75 rounded mx-auto"
              alt=".rrrposter"
              height={"500px"}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
          style={{ marginLeft: "10rem" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          style={{ marginRight: "10rem" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h2 className="text-center my-5 mb-5 fw-bold fs-1">Latest Releases</h2>

      <div className="container ">
      <div className="row ">
        
          {movies && movies.map((item) => (
            <MovieCard key={item._id} title={item.title} id={item._id} description={item.description} date={item.releaseDate} Url ={item.posterUrl}/>
          )).slice(0,4)}
      
        </div>
      </div>

      <div className="text-center my-3">
        <Link className="btn btn-dark" to="/movies" role="button">
          View All Movies
        </Link>
      </div>
    </>
  );
}
