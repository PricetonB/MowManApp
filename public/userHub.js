const baseURL = 'http://localhost:3000';


document.addEventListener('DOMContentLoaded', function () {
    // Function to make API request and update HTML
    function makeAPIRequestAndUpdateHTML() {


        // Make API request using Fetch API
        fetch(`${baseURL}/userData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                // Update the HTML with the received data
                updateHTMLWithData(data);
            })
            .catch(error => {
                console.error('There was a problem with the API request:', error);
                // Handle errors
            });
    }

    // Function to update HTML with the received data
    function updateHTMLWithData(data) {
        // Get the <h2> element where you want to display the data
        const userInfoHeading = document.querySelector('#user-info h2');

        // Update the content of the <h2> element with the received data
        userInfoHeading.textContent = `Hello ${data.name}`;
    }

    // Call the function to make the API request and update HTML
    makeAPIRequestAndUpdateHTML();
});
