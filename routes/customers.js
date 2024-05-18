

/* 

route.get /userHub/customers - returns html file that has list of customers
route.get /userHub/customers/:id - returns html file that has specific customer info and delete button 
route.get /userHub/customers/:id/delete - deletes customer from database



*/

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

// GET route to serve the customers HTML file
router.get('/customers', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'customers.html'));
});

// GET route to fetch customers data
router.get('/customersData', isLoggedIn, async (req, res) => {
    
    try {
        const profileId = req.user.profile_id; // Assuming `req.user.profile_id` is available
        const profile = await Profile.findById(profileId).populate('customers');

        if (!profile) {
            console.log('Profile not found when getting customer data');
            return res.status(404).json({ message: 'Profile not found' });
        }

        const customers = await Customer.find({ _id: { $in: profile.customers } });
        res.status(200).json({ customers });
        console.log("customers found and sent to client side heres customers:");
        console.log(customers);
        
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers', error });
    }
});

module.exports = router;
