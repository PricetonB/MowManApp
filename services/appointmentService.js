const { Appointment, Profile } = require('../database');


// addAppointment function to add a new appointment to the database
const addAppointment = async (appointmentData) => {
    try {
        // Create a new appointment instance using the provided data
        const appointment = new Appointment(appointmentData);

        // Save the appointment to the database
        await appointment.save();

        // Add appointment ID to the profile's appointments array
        await Profile.updateOne(
            { _id: appointmentData.associated_profile_id },
            { $push: { appointments: appointment._id } }
        );

        // Return the newly created appointment object
        return appointment;
    } catch (error) {
        // If an error occurs, throw it to be caught by the controller
        throw error;
    }
};

// setAppointmentInactive function to set an appointment to inactive in the database
const setAppointmentInactive = async (appointmentID) => {
    try {
        // Logic to set appointment to inactive in the database
        await Appointment.updateOne({ _id: appointmentID }, { status: false });
    } catch (error) {
        // If an error occurs, throw it to be caught by the controller
        throw error;
    }
};

// deleteAppointment function to delete an appointment from the database
const deleteAppointment = async (appointmentID) => {
    try {
        // Logic to delete the appointment from the database
        await Appointment.deleteOne({ _id: appointmentID });

        // Remove appointment ID from the profile's appointments array
        await Profile.updateOne(
            { appointments: appointmentID },
            { $pull: { appointments: appointmentID } }
        );
    } catch (error) {
        // If an error occurs, throw it to be caught by the controller
        throw error;
    }
};

// getUsersAppointments function to fetch all appointments associated with a user's profile
const getUsersAppointments = async (profileId) => {
    try {
        // Fetch appointments for the given profile ID
        const appointments = await Appointment.find({ associated_profile_id: profileId });
        return appointments;
    } catch (error) {
        // If an error occurs, throw it to be caught by the controller
        throw error;
    }
};


module.exports = {
    getUsersAppointments,
    addAppointment,
    setAppointmentInactive,
    deleteAppointment
};