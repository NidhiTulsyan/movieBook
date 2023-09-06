import { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers-axios/api-helpers";

export default function AdminProfile() {
  const [admin, setAdmin] = useState([]);
  const [movies,setMovies] = useState([]);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmin(res.admins);
        setMovies(res.admins.addMovies)
        console.log(movies);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="row">
        <p className="display-5 text-center mt-3 mb-5">Admin Profile</p>
        <div className="col-sm-12 col-md-4">
          <div className="ms-5 text-center me-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnD6DstoRKjRAcCjqDrXpRzTDZPA6CWAQ1A&usqp=CAU"
              alt="Admin images"
              height="auto"
              width="150px"
              className=""
            />

            <p className="border border-dark rounded-pill mt-3 ms-5 me-5">
              Email: {admin.email}{" "}
            </p>
          </div>
        </div>
        <div className=" col-md-2"></div>
        <div className="col-sm-12 col-md-6 mt-3 w-50 text-center">
          <div className="ms-5 me-5 ">
            <h3 className="ms-5 me-5 text-center mb-3 fs-2">Added Movies</h3>
            <ul className="list-group list-group-flush  mt-2">
              {movies.map((item, index) => (
                <div
                  className="list-group-item list-group-item-action list-group-item-dark mb-3 d-flex justify-content-between text-dark"
                  key={index}
                  style={{ marginRight: "3rem" }}
                >
                  <p className="fs-4 fw-bold">
                    Movie:<span className=" ms-3 fs-5 lead">{item.title} </span>
                  </p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
