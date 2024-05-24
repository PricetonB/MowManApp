// controllers/customerController.js
const customerService = require('../services/customerService');

const addCustomer = async (req, res) => {
    try {
        await customerService.addCustomer(req.body, req.user);
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding customer', error });
    }
};

const getCustomersData = async (req, res) => {
    try {
        const customers = await customerService.getCustomersData(req.user);
        res.status(200).json({ customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers', error });
    }
};


const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        await customerService.deleteCustomer(customerId);
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ success: false, message: 'Error deleting customer', error: error.message });
    }
};

module.exports = {
    deleteCustomer,
    addCustomer,
    getCustomersData
};
