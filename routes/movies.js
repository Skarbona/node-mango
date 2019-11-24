const express = require('express');

const { Model, validation } = require('../models/movies');
const GenreModel = require('../models/genres').Model;
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Model.find();
    res.send(movies);
});

router.post('/', async (req, res) => {
    let genre;

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    const { title, genreId, numberInStock, dailyRentalRate } = req.body;

    genre = await GenreModel.findById(genreId);
    if (!genre) return res.status(400).send('Invalid Genre');

    const movie = new Model({
        title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock,
        dailyRentalRate
    });
    try {
        const result = await movie.save();
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    try {
        const result = await Model.update({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
            }
        });
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Model.deleteOne({ _id: req.params.id });
        res.send(result)
    } catch (e) {
        res.send(e.message)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Model.findOne({ _id: req.params.id });
        res.send(movie);
    } catch (e) {
        res.send(e.message)
    }
});

module.exports = router;