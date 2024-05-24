const appointmentService = require('../services/appointmentService');
const emailService = require('../services/emailService');




const createAppointment = async (req, res, next) => {
    try {
        // Extract appointment data from the request body
        const { customerId, name, email, phone, date, time, cost, notes } = req.body;
        const profileId = req.user.profile_id; // Assuming `req.user.profile_id` is available

        // Create a new appointment object
        const appointmentData = {
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
        };

        // Call the appointmentService to add the appointment
        const appointment = await appointmentService.addAppointment(appointmentData);

        // Send the response with the newly created appointment
        res.status(201).json({ message: 'Appointment added successfully', appointment });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

const finishAppointment = async (req, res, next) => {
    const { appointmentID } = req.body;
    console.dir(req.body); // Log the request body in more detail

    try {
        await appointmentService.setAppointmentInactive(appointmentID);
        await emailService.sendEmailNotification(appointmentID);
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};

const getUsersAppointments = async (req, res, next) => {
    try {
        const profileId = req.user.profile_id; // Assuming `req.user.profile_id` is available
        const appointments = await appointmentService.getUsersAppointments(profileId);

        res.status(200).json({ appointments });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

const deleteAppointment = async (req, res, next) => {
    const { id } = req.params;

    try {
        await appointmentService.deleteAppointment(id);
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getUsersAppointments,
    createAppointment,
    finishAppointment,
    deleteAppointment
};