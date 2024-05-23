// IMPORTS
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const auth = require('./auth');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userHub');
const customersRoutes = require('./routes/customers');
const addCustomerRoutes = require('./routes/addCustomer');
const appointmentsRoutes = require('./routes/appointments');
const { User, Profile, Customer, Appointment, Setting } = require('./database');
const cron = require('./services/taskScheduler');
require('dotenv').config();

// VARIABLES
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(session({ secret: EXPRESS_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in routes files
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', customersRoutes);
app.use('/', addCustomerRoutes);
app.use('/', appointmentsRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

