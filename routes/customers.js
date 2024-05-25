

// routes/customer.js
const express = require('express');
const path = require('path'); 
const router = express.Router();
const customerController = require('../controllers/customerController');

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.sendStatus(401);
    }
}

// Get route to serve the customers HTML file
router.get('/customersHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'customers.html'));
});

// GET route to serve the add customer HTML file
router.get('/addCustomerHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'addCustomer.html'));
});

// POST route to add a new customer
router.post('/addCustomer', isLoggedIn, customerController.addCustomer);

// GET route to fetch customers data
router.get('/customersData', isLoggedIn, customerController.getCustomersData);

// DELETE route to delete a customer
router.delete('/deleteCustomer/:customerId', isLoggedIn, customerController.deleteCustomer);

module.exports = router;



