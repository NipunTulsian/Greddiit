const mongoose=require("mongoose");

const connectDB= async ()=>{
    try{
        const conn=await mongoose.connect("mongodb://localhost:27017/Greddiit");
        console.log(`MongoDB connected: ${conn.connection.host.cyan}`.cyan.underline)

    }catch(err){
        console.log(err);
    }
}
module.exports = connectDB;