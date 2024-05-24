
const appointmentController = require('../controllers/appointmentController');
const router = require("./userHub");
const path = require("path");


// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.sendStatus(401);
    }
}


// Route to complete an appointment
router.post('/appointmentComplete', isLoggedIn, appointmentController.finishAppointment);

// Route to get all appointments for a user
router.get('/appointmentsData', isLoggedIn, appointmentController.getUsersAppointments);

// DELETE route for deleting appointments
router.delete('/appointment/:id', isLoggedIn, appointmentController.deleteAppointment);

// POST route to create a appointment and add to user's list of appointments
router.post('/addAppointment', isLoggedIn, appointmentController.createAppointment);

// Route to serve the appointments HTML file
router.get('/appointmentsHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'appointments.html'));
});

// Route to serve the schedule appointment HTML file
router.get('/scheduleAppointmentHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'scheduleAppointment.html'));
});


module.exports = router;