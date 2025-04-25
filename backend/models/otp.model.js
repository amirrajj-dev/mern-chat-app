import mongoose from "mongoose"

const schema = new mongoose.Schema({
    phone : {
        type : String ,
        required : false
    },
    email : {
        type : String ,
        required : false
    },
    code : {
        type : String ,
        required : true
    },
    expTime : {
        type : Number ,
        required : true
    },
})

const otpModel = mongoose.models.otp || mongoose.model('otp' , schema)

export default otpModel