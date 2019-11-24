const express = require('express');

const {Customers, validateCustomer} = require('../models/customers');

const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customers.find();
    res.send(customers);
});

router.post('/', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customers({name: req.body.name, phone: req.body.phone, isGold: req.body.isGold});
    try {
        const result = await customer.save();
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const setOption = {};
    if (req.body.name) setOption.name = req.body.name;
    if (req.body.isGold) setOption.isGold = req.body.isGold;
    if (req.body.phone) setOption.phone = req.body.phone;

    try {
        const result = await Customers.update({_id: req.params.id}, {
            $set: setOption
        });
        res.send(result);
    } catch (e) {
        res.send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customers.deleteOne({_id: req.params.id});
        res.send(result)
    } catch (e) {
        res.send(e.message)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customers.findOne({_id: req.params.id});
        res.send(customer);
    } catch (e) {
        res.send(e.message)
    }
});


module.exports = router;