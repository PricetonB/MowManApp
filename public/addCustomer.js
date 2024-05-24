const baseURL = 'http://localhost:3000';


document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-customer-btn');

    addButton.addEventListener('click', function () {
        const name = document.getElementById('customer-name').value;
        const email = document.getElementById('customer-email').value;
        const phone = document.getElementById('customer-phone').value;

        const customerData = {
            name,
            email,
            phone
        };

        fetch(`${baseURL}/addCustomer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Customer added successfully') {
                alert('Customer added successfully');
                // Redirect to /userHub after successful addition
                window.location.href = '/customers'; // Redirect to userHub page
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding customer: ' + error.message);
        });
    });
});
