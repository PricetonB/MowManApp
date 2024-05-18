document.addEventListener('DOMContentLoaded', function () {
    // Function to make API request
    function makeAPIRequest() {
        // Example API endpoint
        const apiUrl = 'https://api.example.com/data';

        // Make API request using Fetch API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                // Process the received data
            })
            .catch(error => {
                console.error('There was a problem with the API request:', error);
                // Handle errors
            });
    }

    // Call the function to make the API request
    makeAPIRequest();
});
