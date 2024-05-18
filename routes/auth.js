const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google OAuth login route
router.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect: '/userHub' 
}));

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            
            res.redirect('/');
        });
    });
});

module.exports = router;
