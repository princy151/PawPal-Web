const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/db_pawpal");
        console.log("MongoDB connected");

    }
    catch(e){
        console.log("Mongodb connection failed");

    }
}

module.exports = connectDB;