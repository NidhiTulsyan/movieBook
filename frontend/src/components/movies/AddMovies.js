import { useState } from "react";
import { AddMoviesByAdmin } from "../../api-helpers-axios/api-helpers";

export default function AddMovies() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    console.log(actors);
    AddMoviesByAdmin({...input,actors}).then((res)=>console.log(res))
  };
//   https://upload.wikimedia.org/wikipedia/en/0/03/3_Ekka_Poster.jpg
  return (
    <div>
      <p className="display-6 text-center">Add A Movies</p>
      <div
        className="card container mx-auto my-5 shadow-lg p-3 mb-5 bg-body rounded"
        style={{ width: "600px" }}
      >
        <form onSubmit={handleInputSubmit}>
          <div className="mb-3 mt-2 fs-5">
            <label htmlFor="exampleInputName" className="form-label">
              Title
            </label>
            <input
              name="title"
              Value={input.title}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="exampleInputName"
            />
          </div>

          <div className="mb-3 mt-2 fs-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <input
              name="description"
              Value={input.description}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3 mt-2 fs-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Poster Url
            </label>
            <input
              name="posterUrl"
              Value={input.posterUrl}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 mt-2 fs-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Date
            </label>
            <input
              name="releaseDate"
              Value={input.releaseDate}
              onChange={handleInputChange}
              type="date"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 mt-2 fs-5  ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Actor
            </label>
            <div className="w-50 d-flex">
              <input
                name="actor"
                onChange={(e) => setActor(e.target.value)}
                type="text"
                value={actor}
                className="form-control "
                id="exampleInputPassword1"
              />
              <input
                type="button"
                className="btn btn-outline-dark ms-3"
                onClick={() => {
                  setActors([...actors, actor]);
                  alert("Added...")
                  setActor("")
                  
                  
                }}
                value="Add"
              />
            </div>
          </div>
          <div className="form-check mb-3 mt-2 fs-5">
            <input
              className="form-check-input"
              name="featured"
              type="checkbox"
              checked={input.featured}
              onClick={(e) =>
                setInput((prev) => ({ ...prev, featured: !input.featured }))
              }
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Featured
            </label>
          </div>

          <button type="submit" className="btn btn-dark mb-4 ">
            {" "}
            Add New Movie
          </button>
        </form>
      </div>
    </div>
  );
}
