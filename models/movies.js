const mongoose = require('mongoose');
const genreSchema = require('./genres').Schema;
const Joi = require('joi');

const titleMaxL = 40;
const titleMinL = 3;
const maxRateAndStock = 255;

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: titleMinL,
        maxlength: titleMaxL,
        trim: true,
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: maxRateAndStock,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: maxRateAndStock,
    },
});

const Movies = new mongoose.model('Movies', moviesSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(titleMinL).max(titleMaxL).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(maxRateAndStock).required(),
        dailyRentalRate: Joi.number().min(0).max(maxRateAndStock).required(),
    };

    return Joi.validate(movie, schema);
}

module.exports = {
    Model: Movies,
    validation: validateMovie,
    schema: moviesSchema,
};