
//IMPORTS
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const auth = require('./auth');
const { User, Profile, Customer } = require('./database');


//--------------------------------
//VARIABLES
const SessionSecret = 'your-session-secret';
const app = express();


//--------------------------------
//MISC FUNCTIONS

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next(); // Proceed to the next middleware
    } else {
        res.sendStatus(401); // Unauthorized
    }
}





//--------------------------------
//MIDDLEWARE
app.use(express.json());
app.use(session({ secret:SessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));




//--------------------------------
//ROUTES



app.get('/', (req, res) => {
    // Send the HTML file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//api to get google auth
app.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

//api callback for google auth to hit after user logs in
app.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect: '/userHub' 
}));




//user homepage redirected by google callback
app.get('/userHub', isLoggedIn, (req, res) => {

    //const name = req.user.name || 'N/A'; // Fallback to 'N/A' if name is not available
    res.send(`    
    <h>Welcome to the profile page</h1>
    <a href="/logout">Logout</a>`);
});


//api to test post request
app.post('/user', (req, res) => {
    res.send('Post request successful');
    res.send(req.body); // This will log the request body to the console
});



//api to logout user and return to home page
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            // Handle error
            console.error(err);
            return next(err);
        }
        
        req.session.destroy((err) => {
            if (err) {
                // Handle error
                console.error(err);
                return next(err);
            }
            
            res.redirect('/');
        });
    });
});

//----------------------------------------------------------

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});