import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
  seat: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const booking = mongoose.model("Booking", bookingSchema);
export default booking;
