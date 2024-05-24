/*
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();

const { User, Profile, Customer } = require('../database');


// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.sendStatus(401);
    }
}

// GET route to serve the add customer HTML file
router.get('/addCustomerHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'addCustomer.html'));
});

// POST route to create a customer and add to user's list of customers
router.post('/addCustomer', isLoggedIn, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const profileId = req.user.profile_id; // Assuming `req.user.profile_id` is available

        // Create a new customer
        const customer = new Customer({
            name,
            email,
            phone,
            associated_profile_id: profileId,
        });

        await customer.save();

        // Add customer ID to the profile's customers array
        await Profile.updateOne(
            { _id: profileId },
            { $push: { customers: customer._id } }
        );

        res.status(201).json({ message: 'Customer added successfully', customer });
    } catch (error) {
        res.status(500).json({ message: 'Error adding customer', error });
    }
});

module.exports = router;
*/