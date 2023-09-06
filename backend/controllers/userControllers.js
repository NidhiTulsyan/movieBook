import bcrypt from "bcrypt";
import user from "../models/user.js";
import booking from "../models/booking.js";
const SECRET = process.env.SECRET;
const salt = bcrypt.genSaltSync(10);

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await user.find();
  } catch (error) {
    return next(error);
  }
  if (!user) {
    res.status(500).json({ message: "something went wrong" });
  }
  res.status(200).json({ users });
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let users;
  try {
  users = await user.findById(id);
  
  } catch (error) {
    return next(error);
  }
  if (!user) {
    res.status(500).json({ message: "something went wrong" });
  }
  res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(422).json({ message: "inputs cannot be empty" });
  }
  let findUser = await user.findOne({ email });
  if (findUser) {
    res.status(400).json({
      message: "email already exixts",
    });
    return;
  }
  const hashedPassword = bcrypt.hashSync(password,10);
  let users;
  try {
    users = new user({ name, email, password: hashedPassword });
    await users.save();
  } catch (error) {
    return next(error);
  }
  const success=false;
  if (!users) {
    res.status(500).json({success, message: "something went wrong" });
  }
  res.status(200).json({success:true, message: "data added successfully", users });
};

export const updateUsers = async (req, res, next) => {
  const id = req.params.id;

  const finduser = await user.findById(id);
  if (!finduser) {
    res.status(400).json({ message: "user doesnot exist. Create one" });
    return;
  }
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(422).json({ message: "inputs cannot be empty" });
  }
  const hashedPassword = bcrypt.hashSync(password, salt);
  let users;
  try {
    users = await user.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
    await users.save();
  } catch (error) {
    return next(error);
  }
  if (!users) {
    res.status(500).json({ message: "something went wrong" });
  }
  res.status(200).json({ message: "data updated successfully", users });
};

export const deleteUsers = async (req, res, next) => {
  const id = req.params.id;

  const finduser = await user.findById(id);

  if (!finduser) {
    res.status(400).json({ message: "user doesnot exist. Create one" });
  }
  let users;
  try {
    users = await user.findByIdAndDelete(id);
  } catch (error) {
    return next(error);
  }
  if (!users) {
    res.status(500).json({ message: "something went wrong" });
  }
  res.status(200).json({ message: "data deleted successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(422).json({ message: "inputs cannot be empty" });
  }
  let users;
  try {
    users = await user.findOne({ email });
    // console.log(users);
  } catch (error) {
    return next(error);
  }
  const comparePassword = bcrypt.compareSync(password, users.password);
  const success = false;
  if (!comparePassword) {
    res.status(400).json({ success,message: "invalid password" });
  }
  res.status(200).json({success:true, message: "User login successful",id:users._id },);
};


export const getUsersBooking = async(req,res,next)=>{
  const id = req.params.id;
  let userBookings ;
  try {
    userBookings =await booking.find({user:id});
  } catch (error) {
    return next(error);
  }

  if (!userBookings) {
    res.status(400).json({ message: "no bookings find with that user id" });
  }
  res.status(200).json({ message: "suucessfull",userBookings });
}