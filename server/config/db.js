const mongoose = require('mongoose')

const connectDB  = async()=>{
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/mgmt_db`);
    console.log(`MongoDB Connected:${conn.connection.host}:${conn.connection.port}`.cyan.underline.bold)
}
module.exports = connectDB;