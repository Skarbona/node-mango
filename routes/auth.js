const express = require('express');
const Joi = require('joi');

const { compareHash } = require('../db/hash');

const { Model, emailRegex } = require('../models/users');
const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    try {
        const { email, password } = req.body;
        const user = await Model.findOne({ email });
        if (!user) return res.status(400).send('Invalid email or password');

        const passIsValid = await compareHash(password, user.password);
        if (!passIsValid) return res.status(400).send('Invalid email or password');

        const token = user.generateAuthToken();
        res.send(token);

    } catch (e) {
        res.status(400).send(e.message)
    }

});

function validate(req) {
    const schema = {
        email: Joi.string().regex(emailRegex).required(),
        password: Joi.string().min(4).max(255).required(),
    };

    return Joi.validate(req, schema);
}


module.exports = router;