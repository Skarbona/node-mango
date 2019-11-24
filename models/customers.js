const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
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
});

const Customers = new mongoose.model('Customers', customerSchema);

function validateCustomer(customer) {
    const reqSchema = {
        name: Joi.string().min(3),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3),
    };

    return Joi.validate(customer, reqSchema);
}


module.exports = {
    Customers,
    validateCustomer,
    schema: customerSchema,
};


