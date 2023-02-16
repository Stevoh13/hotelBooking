const express = require('express');
const {
    getHotels,
    postHotel,
    getHotelById,
    deleteHotelById,
    updateHotelById,
} = require ("../controllers/hotels");

const hotelRouter = express.Router()

hotelRouter.get("/", getHotels);
hotelRouter.post("/", postHotel);
hotelRouter.get("/:id", getHotelById);
hotelRouter.delete("/:id", deleteHotelById);
hotelRouter.patch("/:id", updateHotelById);

module.exports = hotelRouter