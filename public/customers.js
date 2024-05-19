document.addEventListener('DOMContentLoaded', function () {
    function fetchCustomers() {
        fetch('http://localhost:3000/customersData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const customerList = document.getElementById('customers');
            customerList.innerHTML = ''; // Clear any existing content
        
            if (data.customers && data.customers.length > 0) {
                data.customers.forEach(customer => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${customer.name} |||| Email: ${customer.email}  ||||   Phone: ${customer.phone}`;
                    customerList.appendChild(listItem);
                });
            } else {
                const noCustomersItem = document.createElement('li');
                noCustomersItem.textContent = 'No customers have been saved.';
                customerList.appendChild(noCustomersItem);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching customers: ' + error.message);
        });
    }

    // Fetch the customers when the page is loaded
    fetchCustomers();

    // For SPA, listen to a custom event to fetch customers when navigating to this section
    document.addEventListener('navigateToCustomers', fetchCustomers);
});
