
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
    const displayName = req.user.displayName || 'User'; // Fallback to 'User' if displayName is not available
    const email = req.user.emails[0].value || 'N/A'; // Fallback to 'N/A' if email is not available
    const googleId = req.user.id || 'N/A'; // Fallback to 'N/A' if id is not available

    //const name = req.user.name || 'N/A'; // Fallback to 'N/A' if name is not available
    res.send(`    
    <h>Welcome to the profile page ${displayName}</h1>
    <h>Your email is ${email}</h1> 
    <h>your googleID is ${googleId}</h1>
    <a href="/logout">Logout</a>`);
});


//api to test post request
app.post('/user', (req, res) => {
    res.send('Post request successful');
    res.send(req.body); // This will log the request body to the console
});


/*
//api to authenticate and add new user to database
// Handle Google OAuth callback
app.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect to userHub or perform other actions
        
        // Extract user profile information from req.user
        const { id, displayName, emails, } = req.user;
        const profile_id = mongoose.Types.ObjectId(); // Generate a new ObjectId for the profile

        // Check if the user already exists in the database based on their Google ID
        User.findOne({ google_id: id })
            .then(user => {
                if (user) {
                    // User already exists, do nothing
                    res.redirect('/userHub');
                } else {

                    // User doesn't exist, create a new user and save to the database
                    const newUser = new User({
                        google_id: id,
                        profile_id: profile_id
                    });

                    // Create a new profile for the user
                    const newProfile = new Profile({
                        user_id: profile_id,
                        name: displayName,
                        email: emails[0].value // Assuming the first email is used
                    });

                    // Save both user and profile to the database
                    return Promise.all([newUser.save(), newProfile.save()]);
                }
            })
            .then(newUser => {
                // Redirect to userHub after saving the new user
                res.redirect('/userHub');
            })
            .catch(error => {
                console.error('Error creating user:', error);
                res.redirect('/'); // Redirect to home page on error
            });
    }
);
*/

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


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});