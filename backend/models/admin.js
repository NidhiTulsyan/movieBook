import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    addMovies:[{type:objectId, ref:'Movie'}]
},
{
    timestamps:true,
})

const admin = mongoose.model('Admin',adminSchema);
export default admin;