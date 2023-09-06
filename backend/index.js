import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import movieRouter from './routes/movieRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import cors from 'cors';

const app = express();

const port = process.env.PORT;
const connectionString = process.env.CONNECT_STRING;

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/admin",adminRouter);
app.use("/movies",movieRouter);
app.use("/bookings",bookingRouter);

mongoose.connect(connectionString).then(()=>{
console.log("connected to database successfully");
}).catch((err)=>{
    console.log(err);
});

app.listen(port,()=>{
    console.log(`server is running on port ${port} at http://localhost:${port}`);
})