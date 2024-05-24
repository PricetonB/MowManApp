// services/customerService.js
const { Profile, Customer } = require('../database');




// Add a new customer to the database
const addCustomer = async (customerData, user) => {
    const { name, email, phone } = customerData;
    const profileId = user.profile_id; // Assuming `user.profile_id` is available

    const customer = new Customer({
        name,
        email,
        phone,
        associated_profile_id: profileId,
    });

    await customer.save();

    // Add customer ID to the profile's customers array
    await Profile.updateOne(
        { _id: profileId },
        { $push: { customers: customer._id } }
    );
};




// Get all customers associated with the user's profile
const getCustomersData = async (user) => {
    const profileId = user.profile_id; // Assuming `user.profile_id` is available
    const profile = await Profile.findById(profileId).populate('customers');

    if (!profile) {
        throw new Error('Profile not found when getting customer data');
    }

    const customers = await Customer.find({ _id: { $in: profile.customers } });
    return customers;
};




// Delete a customer by ID
const deleteCustomer = async (customerId) => {
    await Customer.findByIdAndDelete(customerId);
    // Remove customer ID from associated profile's customers array
    await Profile.updateOne(
        { customers: customerId },
        { $pull: { customers: customerId } }
    );
};

module.exports = {
    deleteCustomer,
    addCustomer,
    getCustomersData
};
