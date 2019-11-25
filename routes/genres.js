const express = require('express');

const { Model, validation } = require('../models/genres');
const authChecker = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Model.find();
    res.send(genres);
});

router.post('/', authChecker, async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    const genre = new Model({ name: req.body.name });
    try {
        const result = await genre.save();
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
                name: req.body.name,
            }
        });
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
});

router.delete('/:id', [ authChecker, isAdmin ], async (req, res) => {
    try {
        const result = await Model.deleteOne({ _id: req.params.id });
        res.send(result)
    } catch (e) {
        res.send(e.message)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Model.findOne({ _id: req.params.id });
        res.send(genre);
    } catch (e) {
        res.send(e.message)
    }
});

module.exports = router;