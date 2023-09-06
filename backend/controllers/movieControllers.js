import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import movie from "../models/movie.js";
import admin from "../models/admin.js";

export const postmovies = async (req, res, next) => {
  let adminId;
  const extractedToken = req.headers.token;
  if (!extractedToken && extractedToken.trim() == "") {
    res.status(400).json({ message: "token is not valid" });
  }
  jwt.verify(extractedToken, process.env.SECRET, (err, decode) => {
    if (err) {
      res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decode.id;
      return adminId;
    }
  });
  const { title, description, posterUrl, releaseDate, featured, actors } =
    req.body;
  if (!title && !description && !posterUrl) {
    res.status(422).json({ message: "invalid inputs" });
  }
  let movies;
  try {
    movies = new movie({
      title,
      description,
      posterUrl,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
    });
    const session = await mongoose.startSession();
    let adminUser = await admin.findById(adminId);
    session.startTransaction();
    await movies.save({session});
    console.log(movies.id);
  //  const movieid =movies.id;
    adminUser.addMovies.push(movies);
    await adminUser.save({session});
    console.log(adminUser);
    await session.commitTransaction();
  } catch (error) {
    return next(error);
  }

  if (!movies) {
    res.status(500).json({ message: "request failed" });
  } else {
    res.status(200).json({success:"added",movies});
  }
};


export const getmovies = async (req, res, next) => {
let movies;
try {
  movies = await movie.find();
} catch (error) {
  return next(error);
}

if (!movies) {
  res.status(500).json({ message: "no movies found" });
} else {
  res.status(200).json({movies});
}
}

export const getmoviesbyid = async (req, res, next) => {
let movies;
let id = req.params.id;
try {
  movies = await movie.findById(id);
} catch (error) {
  return next(error);
}

if (!movies) {
  res.status(500).json({ message: "no movies found with this id" });
} else {
  res.status(200).json({movies});
}
}