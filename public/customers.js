
const baseURL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function () {
    function fetchCustomers() {
        fetch(`${baseURL}/customersData`, {
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
                    const listItemName = document.createElement('li');
                    listItemName.textContent = `Name: ${customer.name}`;
                    customerList.appendChild(listItemName);
            
                    const listItemEmail = document.createElement('li');
                    listItemEmail.textContent = `Email: ${customer.email}`;
                    customerList.appendChild(listItemEmail);
            
                    const listItemPhone = document.createElement('li');
                    listItemPhone.textContent = `Phone: ${customer.phone}`;
                    customerList.appendChild(listItemPhone);
            
                    // Create and append the separator
                    const separator = document.createElement('hr');
                    separator.style.borderTop = '5px solid #31b41a'; // Thick line with color #31b41a
                    customerList.appendChild(separator);
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
