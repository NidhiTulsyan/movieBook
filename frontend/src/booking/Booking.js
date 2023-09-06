import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getSelectedMovie, postBooking } from "../api-helpers-axios/api-helpers";
import { useSelector } from "react-redux";

export default function Booking() {
  const id = useParams().id;
  const [movie, setMovie] = useState([]);
  const actorsname = [];
  const [inputs,setInputs]=useState({seatNumber:"",date:""});
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    getSelectedMovie(id)
      .then((res) => setMovie(res.movies))
      .catch((err) => console.log(err));
  }, [id]);
 

    actorsname.push(movie.actors);
  
  console.log(movie);
  console.log(actorsname);
  const handlechange =(e)=>{
    setInputs((prev)=>({
    ...prev,
    movieName:movie.title,
    [e.target.name]:e.target.value,
  }))
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    if(isUserLoggedIn){
      console.log(inputs);
      postBooking({movie:movie._id,...inputs}).then((res)=>console.log(res)).catch((err)=>console.log(err));

    }else{
      navigate('/auth');
      alert("First login to book a movie");
    }
  }
  return (
    <div>
      {movie && (
        <>
          <p className="display-5 text-center mb-5">
            Booking For Movie : {movie.title}
          </p>
          <div className="row mt-5 ms-5">
            <div className="col-sm-12 col-md-6">
              <img
                src={movie.posterUrl}
                class="img-thumbnail"
                alt="poster"
                width="100%"
                style={{ height: "45%" }}
              />
              <p className="lead mt-3 fs-4">{movie.description}</p>
              <p className="lead mt-3 fs-4"><span className="fw-bold">Starrer: </span>{actorsname.map((ac)=>" "+ac+" ")}</p>
              <p className="lead mt-3 fs-5">
                <span className="fw-bold">Releasing Date: </span>
                {new Date(movie.releaseDate).toDateString()}
              </p>
            </div>

            <div className="col-sm-12 col-md-6">
              <form onSubmit={handleSubmit}>
              <div className="me-5 ms-5">
                  <label  class="lead form-label mb-3 fs-4">
                    Movie Name
                  </label>
                  <input
                    type="text"
                    class="form-control border-0 border-bottom border-dark mb-3"
                   name="movieName"
                   disabled={true}
                   value={movie.title}
                    style={{ borderColor: "transparent", boxShadow: "none" }}
                  ></input>
                </div>

                <div className="me-5 ms-5">
                  <label  class="lead form-label mb-3 fs-4">
                    Seat Number
                  </label>
                  <input
                    type="number"
                    class="form-control border-0 border-bottom border-dark mb-3"
                   name="seatNumber"
                   value={inputs.seatNumber}
                   onChange={handlechange}
                    style={{ borderColor: "transparent", boxShadow: "none" }}
                  ></input>
                </div>
                <div className="me-5 ms-5">
                  <label  class="lead form-label mb-3 fs-4">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={inputs.date}
                    onChange={handlechange}
                    class="form-control border-0 border-bottom border-dark"
                    
                    style={{ borderColor: "transparent", boxShadow: "none" }}
                  ></input>
                </div>
                <div className="d-grid me-5 ms-5">
                  <button type="submit" className="btn btn-outline-dark  mt-5">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
