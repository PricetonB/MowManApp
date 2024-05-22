const appointmentService = require('../services/appointmentService');
const emailService = require('../services/emailService');

const finishAppointment = async (req, res, next) => {
    const { appointmentID } = req.body;
    console.log(`appointmentID in server controller: ${appointmentID}`);
    console.log('req.body:');
    console.dir(req.body); // Log the request body in more detail

    try {
        //await appointmentService.setAppointmentInactive(appointmentID);
        await emailService.sendEmailNotification(appointmentID);
        res.json({ success: true });
        console.log(`sending res status 200`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    finishAppointment
};
