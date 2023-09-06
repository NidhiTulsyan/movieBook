import express from 'express';
import  { deleteUsers, getAllUsers, getUserById, getUsersBooking, login, signup, updateUsers} from '../controllers/userControllers.js';
const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUserById);
userRouter.post('/signup',signup);
userRouter.put('/update/:id',updateUsers);
userRouter.delete('/delete/:id',deleteUsers);
userRouter.post('/login',login)
userRouter.get("/bookings/:id",getUsersBooking);

export default userRouter;