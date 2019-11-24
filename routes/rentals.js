const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');

const { validation, Model } = require('../models/rentals');
const Customer = require('../models/customers').Customers;
const Movie = require('../models/movies').Model;

Fawn.init(mongoose);
const router = express.Router();

router.post('/', async (req, res) => {
    let customer, movie;

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    const { movieId, customerId } = req.body;


    try {
        customer = await Customer.findById(customerId);
        if (!customer) return res.status(400).send('Invalid Customer');

        movie = await Movie.findById(movieId);
        if (!movie) return res.status(400).send('Invalid Movie');
        if (movie.numberInStock === 0) return res.status(400).send('No movie in Stock');

        const rental = new Model({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental)

    } catch (e) {
        res.status(400).send(e.message)
    }

});

router.get('/', async (req, res) => {
    try {
        const rentals = await Model.find().sort('-dateOut');
        res.send(rentals)
    } catch (e) {
        res.send(e.message)
    }

});


module.exports = router;