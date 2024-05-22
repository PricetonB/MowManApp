const { User, Profile, Customer, Appointment } = require("../database");
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
router.post('/appointmentComplete', appointmentController.finishAppointment);


// POST route to create a appointmetn and add to user's list of appointments
router.post('/addAppointment', isLoggedIn, async (req, res) => {
    try {
        const { customerId, name, email, phone, date, time, cost, notes } = req.body;
        const profileId = req.user.profile_id; // Assuming `req.user.profile_id` is available

        // Create a new appointment
        const appointment = new Appointment({
            associated_customer_id: customerId,
            name,
            email,
            phone,
            date,
            time,
            cost,
            notes,
            associated_profile_id: profileId,
            status: true
        });
        

        // Save the appointment
        await appointment.save();

        // Add appointment ID to the profile's appointments array
        await Profile.updateOne(
            { _id: profileId },
            { $push: { appointments: appointment._id } }
        );

        // Send the response with the newly created appointment
        res.status(201).json({ message: 'Appointment added successfully', appointment });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error adding appointment:', error);
        res.status(500).json({ message: 'Error adding appointment', error });
    }
});


router.get('/appointmentsData', isLoggedIn, async (req, res) => {
    try {
        const profileId = req.user.profile_id; // Assuming `req.user.profile_id` is available
        const appointments = await Appointment.find({ associated_profile_id: profileId });

        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
});


router.get('/appointmentsHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'appointments.html'));
});

router.get('/scheduleAppointmentHTML', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'scheduleAppointment.html'));
});


module.exports = router;