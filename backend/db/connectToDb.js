import mongoose from "mongoose";

export const connectToDb = async ()=>{
    try {
        if (mongoose.connections[0].readyState){
            console.log('already connected To Db ⚡👺');
            return
        }
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('Connected To Db Succesfully ⚡👺');
        })
    } catch (error) {
        console.log('sth goes wrong connecting to the db => ' , error);
        process.exit(1)
    }
}