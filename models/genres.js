const mongoose = require('mongoose');
const Joi = require('joi');

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    }
});

const Genres = new mongoose.model('Genres', genresSchema);

function validateGenre(genre) {
    const reqSchema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, reqSchema);
}

module.exports = {
    Model: Genres,
    validation: validateGenre,
    Schema: genresSchema,
};