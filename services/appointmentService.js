const { Appointment } = require('../database');

const setAppointmentInactive = async (appointmentID) => {
    // Logic to set appointment to inactive in the database
    await Appointment.updateOne({ _id: appointmentID }, { status: false });
};

module.exports = {
    setAppointmentInactive
};
