import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api-helpers-axios/api-helpers.js";

export default function Movies() {
  const [movies,setMovies] = useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err));
    },[])
    // console.log(movies);
  return (
    <>
      <h1 className="text-center fw-bold my-4">All Movies</h1>

      <div className="container ">
      <div className="row ">
        
          {movies && movies.map((item) => (
            <MovieCard key={item._id} title={item.title} id={item._id} description={item.description} date={item.releaseDate} Url ={item.posterUrl}/>
          ))}
      
        </div>
      </div>
    </>
  );
}
