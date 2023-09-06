import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    bookingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    password:{
        type:String,
        required:true,
        minLength:6
    }
},
{
    timestamps:true,
})

const user = mongoose.model('User',userSchema);
export default user;