
const mongoose = require('mongoose');                //Import mongoose and the 
require('dotenv').config();                         //import dotenv module
const MONGODB_URI = process.env.MONGODB_URI;      //Load the MongooseDB URI from the environment variables

function connectToMongoDB() {                   //Function to connect to MongoDB
mongoose.connect(
    MONGODB_URI,
    {
        dbName: "hotelBooking",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },

    (err) =>
        err ? console.log(err) : console.log(
            "Connected to hotelBooking database"),
    )};
   
module.exports = {connectToMongoDB}             //Export the connectToMongoDB function
