import mongoose from "mongoose";
import booking from "../models/booking.js";
import movies from "../models/movie.js";
import users from "../models/user.js";
import user from "../models/user.js";
import movie from "../models/movie.js";

export const postbooking = async (req, res, next) => {
  const { movie, user, seat, date, movieName } = req.body;
  if (!movie && !user && !seat && !date && !movieName) {
    res.status(422).json({ message: "inputs cannot be empty" });
  }
  let existingMovie;
  let existingUser;

  try {
    existingMovie = await movies.findById(movie);
    existingUser = await users.findById(user);
  } catch (error) {
    return next(error);
  }

  if (!existingMovie) {
    res.status(500).json({ message: "movie not found by given id" });
  }
  if (!existingUser) {
    res.status(500).json({ message: "user not found by given id" });
  }

  let bookings;
  try {
    bookings = new booking({ movie, movieName, user, seat, date: new Date(`${date}`) });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookingList.push(bookings);
    existingMovie.bookingList.push(bookings);
    await existingMovie.save({ session });
    await existingUser.save({ session });
    await bookings.save({ session });
    session.commitTransaction();
  } catch (error) {
    return next(error);
  }
  if (!bookings) {
    res.status(500).json({ message: "something went wrong" });
  }
  res
    .status(200)
    .json({ message: "booking data added successfully", bookings });
};

export const getbookindbyId = async (req, res, next) => {
  let bookings;
  let id = req.params.id;
  try {
    bookings = await booking.findById(id);
  } catch (error) {
    return next(error);
  }

  if (!bookings) {
    res.status(500).json({ message: "no bookings found with this id" });
  } else {
    res.status(200).json({ bookings });
  }
};

export const deletebooking = async (req, res, next) => {
  let bookings;
  let users;
  let movies;

  let id = req.params.id;
  try {
    bookings = await booking
      .findByIdAndRemove(id)
      .populate({ path: "users", strictPopulate: false })
      .populate({ path: "movies", strictPopulate: false })
      .exec();
    users = await user.findById(bookings.user);
    movies = await movie.findById(bookings.movie);
    //creating session
    const session = await mongoose.startSession();
    session.startTransaction();
    await users.bookingList.pull(bookings);
    await movies.bookingList.pull(bookings);
    await movies.save({ session });
    await users.save({ session });
    session.commitTransaction();
  } catch (error) {
    return next(error);
  }

  if (!bookings) {
    res.status(500).json({ message: " bookings deleted with this id" });
  } else {
    res.status(200).json({ message: "deleted" });
  }
};
