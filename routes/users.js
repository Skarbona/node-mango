const express = require('express');
const { pick } = require('lodash');
const { hash } = require('../db/hash');

const { validation, Model } = require('../models/users');
const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    try {
        const { email, password, name } = req.body;
        const userAlreadyExist = await Model.findOne({ email });
        if (userAlreadyExist) return res.status(400).send('User Already Exist');

        const user = new Model({
            email,
            password: await hash(password),
            name
        });

        await user.save();

        res.send(pick(user, [ 'name', 'email', '_id' ]));

    } catch (e) {
        res.status(400).send(e.message)
    }

});

router.get('/', async (req, res) => {
    try {
        const users = await Model.find().sort('name');
        res.send(users)
    } catch (e) {
        res.status(400).send(e.message)
    }

});

module.exports = router;