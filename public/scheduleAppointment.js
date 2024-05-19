document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-appointment-btn');
    const customerSelect = document.getElementById('customer-select');
    const nameField = document.getElementById('appointment-name');
    const emailField = document.getElementById('appointment-email');
    const phoneField = document.getElementById('appointment-phone');
    let customersData = []; // Array to store fetched customer data

    // Fetch and populate customer data
    function fetchCustomers() {
        fetch('http://localhost:3000/customersData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            customersData = data.customers || [];
            //log data.customers to the console
            console.log(`data.customers in schedule appointmetn: ${data.customers}`)
            customerSelect.innerHTML = ''; // Clear any existing options

            if (customersData.length > 0) {
                customersData.forEach(customer => {
                    const option = document.createElement('option');
                    option.value = customer._id; // Use customer ID as value
                    option.textContent = `${customer.name} (${customer.email})`;
                    customerSelect.appendChild(option);
                });

                // Automatically populate fields with the first customer's data
                populateCustomerFields(customersData[0]);
            } else {
                const noCustomersOption = document.createElement('option');
                noCustomersOption.textContent = 'No customers available';
                customerSelect.appendChild(noCustomersOption);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching customers: ' + error.message);
        });
    }

    // Populate form fields based on the selected customer
    function populateCustomerFields(customer) {
        nameField.value = customer.name;
        emailField.value = customer.email;
        phoneField.value = customer.phone;
    }

    // Event listener for when a different customer is selected
    customerSelect.addEventListener('change', function () {
        const selectedCustomerId = customerSelect.value;
        
        const selectedCustomer = customersData.find(customer => customer._id === selectedCustomerId);
        //log selectedCustomer to the console
        console.log(`selectedCustomer in schedule appointment: ${selectedCustomer}`)
        //log selectedCustomerId to the console
        console.log(`selectedCustomerId in schedule appointment: ${selectedCustomerId}`)
        if (selectedCustomer) {
            populateCustomerFields(selectedCustomer);
        }
    });

    addButton.addEventListener('click', function () {
        const customerId = customerSelect.value;
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const cost = document.getElementById('appointment-cost').value;
        const notes = document.getElementById('appointment-notes').value;
        //log customerId to the console
        console.log(`customerId in schedule appointment addbutton event listener: ${customerId}`)

        const appointmentData = {
            customerId,
            name: nameField.value,
            email: emailField.value,
            phone: phoneField.value,
            date,
            time,
            cost,
            notes
        };
        //log appointmentData to the console
        console.log(`appointmentData customer id in schedule appointment addbutton event listener: ${appointmentData.customerId}`)

        fetch('http://localhost:3000/addAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Appointment added successfully') {
                alert('Appointment added successfully');
                // Redirect to /appointments after successful addition
                window.location.href = '/appointments';
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding appointment: ' + error.message);
        });
    });

    // Fetch the customers when the page is loaded
    fetchCustomers();
});