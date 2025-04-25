import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    } ,
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    bio : {
        type : String
    },
    avatar : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ['male' , 'female'] 
    },
    resetToken : {
        type : String,
        required : false
    },
    resetTokenExpiry : {
        type : Number,
        required : false
    }
},{
    timestamps : true
})


const usersModel = mongoose.models.user || mongoose.model('user' , schema)

export default usersModel;