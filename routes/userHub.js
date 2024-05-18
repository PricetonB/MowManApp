const express = require('express');
const router = express.Router();

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.sendStatus(401);
    }
}

// User home page after login
router.get('/userHub', isLoggedIn, (req, res) => {
    res.send(`    
    <h1>Welcome to the profile page</h1>
    <a href="/logout">Logout</a>`);
});

// Test POST request
router.post('/user', (req, res) => {
    res.send('Post request successful');
    console.log(req.body); // Log the request body to the console
});

module.exports = router;
