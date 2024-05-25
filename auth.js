const mongoose = require('mongoose');
const { User, Profile } = require('./database');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


require('dotenv').config();



GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


const baseUrl = 'http://localhost:3000';



passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${baseUrl}/google/callback`,
  passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done) {
  const { id, displayName, emails } = profile;
  const profile_id = new mongoose.Types.ObjectId();

  // Check if the user already exists
  User.findOne({ google_id: id })
    .then(user => {

      // If the user exists, return the user
      if (user) {
        console.log('User already exists');
        return done(null, user);

      // If the user does not exist, create a new user
      } else {
        console.log('User does not exist, creating a new one');
        const newUser = new User({
          google_id: id,
          profile_id: profile_id
        });

        const newProfile = new Profile({
          _id: profile_id,
          user_id: profile_id,
          name: displayName,
          email: emails[0].value
        });

        console.log('Saving new user and profile');
        return newUser.save()
          .then(() => {
            console.log('New user saved, saving profile now');
            return newProfile.save();
          })
          .then(() => {
            console.log('New profile saved');
            return done(null, newUser);
          })
          .catch(error => {
            console.error('Error saving user and profile:', error);
            return done(error, null);
          });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      return done(error, null);
    });
}));




//---------------------------------------------------------------
//---------------------------------------------------------------


passport.serializeUser((user, done) => {
    done(null, user.id); // Store only the user ID in the session
    });
    
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
    done(err, user); // Attach the full user object to req.user
    });
});



//---------------------------------------------------------------
//---------------------------------------------------------------


