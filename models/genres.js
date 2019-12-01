const mongoose = require('mongoose');
const Joi = require('joi');

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

const Genres = new mongoose.model('Genres', genresSchema);

function validateGenre(genre) {
    const reqSchema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(genre, reqSchema);
}

module.exports = {
    Model: Genres,
    validation: validateGenre,
    Schema: genresSchema,
};