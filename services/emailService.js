const nodemailer = require('nodemailer');
const { Profile, Customer, Setting, Appointment } = require('../database');

// Set up the Nodemailer transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmailNotification = async (appointmentID) => {
    try {
        // Fetch the appointment document by appointmentID
        const appointment = await Appointment.findById(appointmentID);
        if (!appointment) {
            throw new Error('Appointment not found');
        }

        const profileID = appointment.associated_profile_id;

        // Fetch the Setting document associated with the profileID, or create one if it doesn't exist
        let setting = await Setting.findOne({ associated_profile_id: profileID });

        if (!setting) {
            // Create a new setting document with default values
            setting = new Setting({
                associated_profile_id: profileID,
                sendCustomerEmailNotifications: true // default value
            });
            await setting.save();
        }

        // Check if email notifications are enabled
        if (setting.sendCustomerEmailNotifications) {
            // Fetch the customer document by customerID
            const customerID = appointment.associated_customer_id;
            const customer = await Customer.findById(customerID);
            const profile = await Profile.findById(profileID);

            if (!customer) {
                
                throw new Error('Customer not found');
            }

            // Define mail options
            const mailOptions = {
                from: process.env.SMTP_USER, // sender address
                to: customer.email, // list of receivers
                subject: 'Appointment Completed', // Subject line
                text: `Your appointment ID: ${appointmentID} with ${profile.name} has been completed.`, // plain text body
            };

            // Send the email using the transporter
            await transporter.sendMail(mailOptions);
        }
    } catch (error) {
        console.log(`appointmentID: ${appointmentID}`);
        console.error('Error sending email:', error);
    }
};




module.exports = {
    sendEmailNotification
};
