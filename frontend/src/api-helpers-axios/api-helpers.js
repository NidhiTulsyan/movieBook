import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movies").catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  return data;
};

export const sendUserSignupLogin = async (data, signupKey) => {
  const res = await axios
    .post(`/users/${signupKey ? "login" : "signup"}`, {
      name: signupKey ? "" : data.name,
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  
  const userData = await res.data;
  return userData;
};

export const sendAdminLogin = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  const adminData = await res.data;
  return adminData;
};

export const getSelectedMovie = async (id) => {
  const res = await axios.get(`/movies/${id}`).catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  const movieData = await res.data;
  return movieData;
};

export const postBooking = async(data)=>{
  const res = await axios.post('/bookings',{

    movie:data.movie,
    movieName:data.movieName,
    seat:data.seatNumber,
    date:data.date,
    user:localStorage.getItem("userId")

  }).catch((err)=>console.log(err))
  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  const bookingData = await res.data;
  return bookingData;
}

export const getUserBookingList = async(data)=>{
  const id = localStorage.getItem("userId");
  const res = await axios.get(`users/bookings/${id}`).catch((err)=>console.log(err))

  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  const bookingData = await res.data;
  const blength = bookingData.userBookings;
  blength.forEach((e,i) => {
    localStorage.setItem(`movieId[${i}]`,e.movie)
  });
  return bookingData;
}

export const getUserId = async()=>{
  const id = localStorage.getItem("userId");
const res = await axios.get(`users/${id}`).catch((err)=>console.log(err));
if (res.status !== 200) {
  return console.log("Unexpected Error Occured");
}
const userDetails = await res.data;
return userDetails;
}

export const movieById = async(id)=>{
  const res = await axios.get(`movies/${id}`).catch((err)=>console.log(err));
if (res.status !== 200) {
  return console.log("Unexpected Error Occured");
}
const movieDetails = await res.data;
return movieDetails.movies;
}

export const bookingDelete = async(id)=>{
  const res = await axios.delete(`bookings/${id}`).catch((err)=>console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  const movieDeleted = await res.data;
  return movieDeleted;
}

export const AddMoviesByAdmin = async(data)=>{
  const res = await axios.post("/movies",{
    title:data.title,
    description:data.description,
    posterUrl:data.posterUrl,
    featured:data.featured,
    actors:data.actors,
    releaseDate:data.releaseDate
  },{
    headers:{
      token:`${localStorage.getItem("adminToken")}`
    }
  }).catch((err)=>console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error Occured");
  }
  const Adddate = await res.data;
  return Adddate;
}


export const getAdminById = async()=>{
  const id = localStorage.getItem("adminId");
const res = await axios.get(`/admin/${id}`).catch((err)=>console.log(err));
if (res.status !== 200) {
  return console.log("Unexpected Error Occured");
}
const adminDetails = await res.data;
return adminDetails;
}