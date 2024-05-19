const express = require('express');
const router = express.Router();
const path = require('path');
const { User, Profile, Customer } = require('../database');

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.sendStatus(401);
    }
}


router.get('/userHub', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'userHub.html'));
});

/*
// User home page after login
router.get('/userHub', isLoggedIn, (req, res) => {
    res.send(`    
    <h1>Welcome to the profile page</h1>
    <a href="/logout">Logout</a>`);
});
*/

// Test POST request
router.post('/user', isLoggedIn, (req, res) => {
    res.send('Post request successful');
    console.log(req.body); // Log the request body to the console
});

// Test GET request
router.get('/userTest', isLoggedIn, (req, res) => {
    Profile.findOne({ user_id: req.user.profile_id })
        .then(profile => {
            const responseData = profile;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(responseData));

        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            res.sendStatus(500);
        });
});


module.exports = router;
