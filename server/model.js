import mongoose  from "mongoose";

const Schema = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:mongoose.Mixed,
        require:true
    },
    otp:{
        type: Number,
    }
 
}) 

export const User = mongoose.model("User", Schema);       

