import { useEffect, useState } from "react";
import {
  bookingDelete,
  getUserBookingList,
  getUserId,
} from "../api-helpers-axios/api-helpers";


export default function UserProfile() {
 
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUserBookingList()
      .then((res) => setBooking(res.userBookings))
      .catch((err) => console.log(err));

    getUserId()
      .then((res) => setUser(res.users))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    bookingDelete(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    alert("deleted");
    window.location.reload();
  };
  return (
    <>
      <div className="row">
        <p className="display-5 text-center mt-3 mb-5">User Profile</p>
        <div className="col-sm-12 col-md-4">
          <div className="ms-5 text-center me-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnD6DstoRKjRAcCjqDrXpRzTDZPA6CWAQ1A&usqp=CAU"
              alt="user images"
              height="auto"
              width="150px"
              className=""
            />
            <p className="border border-dark rounded-pill mt-3 ms-5 me-5">
              Name: {user.name}{" "}
            </p>
            <p className="border border-dark rounded-pill mt-3 ms-5 me-5">
              Email: {user.email}{" "}
            </p>
          </div>
        </div>
        <div className=" col-md-2"></div>
        <div className="col-sm-12 col-md-6 mt-5 w-50 text-center">
          <div className="ms-5 me-5 ">
            <h3 className="ms-5 me-5 text-center">Bookings</h3>
            <ul className="list-group list-group-flush  mt-2">
              <div className="list-group-item list-group-item-secondary mb-3  d-flex justify-content-between text-dark fw-bold display-7 fs-5">
                <p>Movie</p>
                <p>Seat</p>
                <p>Date</p>
                <p>cancel Booking</p>
              </div>

              {booking.map((item, index) => (
                <div
                  className="list-group-item list-group-item-action list-group-item-dark mb-3 d-flex justify-content-between text-dark"
                  key={index}
                  style={{ marginRight: "3rem" }}
                >
                  <p>{item.movieName} </p>
                  <p>{item.seat} </p>
                  <p>{new Date(item.date).toDateString()} </p>
                  <div onClick={() => handleDelete(booking[index]._id)}>
                    <i className="fa-solid fa-trash text-danger fs-4"></i>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
