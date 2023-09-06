import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  actors: [
    {
      type: String,
      required: true,
    },
  ],
  releaseDate: {
    type: Date,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  }
});

const movie = mongoose.model("Movie", movieSchema);
export default movie;
