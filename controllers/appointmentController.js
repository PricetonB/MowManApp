const appointmentService = require('../services/appointmentService');
const emailService = require('../services/emailService');

const finishAppointment = async (req, res, next) => {
    const { appointmentID } = req.body;

    try {
        //await appointmentService.setAppointmentInactive(appointmentID);
        await emailService.sendEmailNotification(appointmentID);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    finishAppointment
};
