const express = require('express');
const router = express.Router();
const Person = require('../models/person.model');

// GET /person - Get all people
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /person - Create a new person
router.post('/', async (req, res) => {
    const person = new Person({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber
    });

    try {
        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /person/:id - Update a person
router.put('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        if (req.body.name) person.name = req.body.name;
        if (req.body.age) person.age = req.body.age;
        if (req.body.gender) person.gender = req.body.gender;
        if (req.body.mobileNumber) person.mobileNumber = req.body.mobileNumber;

        const updatedPerson = await person.save();
        res.json(updatedPerson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /person/:id - particular people
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /person/:id - Delete a person
router.delete('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }

        await person.deleteOne();
        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 
