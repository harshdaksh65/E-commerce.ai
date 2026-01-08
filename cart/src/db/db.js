const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Database connection failed");
    }
}

module.exports = connectDB;