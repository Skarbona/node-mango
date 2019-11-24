const mongoose = require('mongoose');
const Joi = require('joi');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = (email) => emailRegex.test(email);


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    }
});

const Model = new mongoose.model('Users', Schema);

function validation(item) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().regex(emailRegex).required(),
        password: Joi.string().min(4).max(255).required(),
    };

    return Joi.validate(item, schema);
}

module.exports = {
    Model,
    validation,
    Schema,
    emailRegex,
};