const mongoose = require('mongoose');
const Joi = require('joi');

const titleMaxL = 40;
const titleMinL = 3;
const maxRateAndStock = 255;

const genresSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
            },
        }),
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: titleMinL,
                maxlength: titleMaxL,
                trim: true,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: maxRateAndStock,
            },
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0,
    }

});

const Rentals = new mongoose.model('Rentals', genresSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

module.exports = {
    Model: Rentals,
    validation: validateRental,
    Schema: genresSchema,
};