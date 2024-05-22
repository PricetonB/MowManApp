/*


document.addEventListener('DOMContentLoaded', function () {
    function fetchAppointments() {
        fetch('http://localhost:3000/appointmentsData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const appointmentList = document.getElementById('appointments');
            appointmentList.innerHTML = ''; // Clear any existing content
        
            if (data.appointments && data.appointments.length > 0) {
                data.appointments.forEach(appointment => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${appointment.name} --- Date: ${appointment.date}  --- Time: ${appointment.time} --- Phone: ${appointment.phone}`;
                    appointmentList.appendChild(listItem);
                });
            } else {
                const noAppointmentsItem = document.createElement('li');
                noAppointmentsItem.textContent = 'No appointments have been saved.';
                appointmentList.appendChild(noAppointmentsItem);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching appointments: ' + error.message);
        });
    }

    // Fetch the appointments when the page is loaded
    fetchAppointments();

    // For SPA, listen to a custom event to fetch appointments when navigating to this section
    document.addEventListener('navigateToAppointments', fetchAppointments);
});



*/





document.addEventListener('DOMContentLoaded', function () {
    function fetchAppointments() {
        fetch('http://localhost:3000/appointmentsData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const appointmentList = document.getElementById('appointments');
            appointmentList.innerHTML = ''; // Clear any existing content
            if (data.appointments && data.appointments.length > 0) {
                data.appointments.forEach(appointment => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${appointment.name} --- Date: ${appointment.date} --- Time: ${appointment.time} --- Phone: ${appointment.phone}`;
                    listItem.setAttribute('data-appointment-id', appointment._id);
                    console.log(`appointment._id in client creation: ${appointment._id}`);
                    const finishButton = document.createElement('button');
                    finishButton.textContent = 'Mark as Finished';
                    finishButton.setAttribute('onclick', 'finishAppointment(this)');
                    listItem.appendChild(finishButton);
                    appointmentList.appendChild(listItem);
                });
            } else {
                const noAppointmentsItem = document.createElement('li');
                noAppointmentsItem.textContent = 'No appointments have been saved.';
                appointmentList.appendChild(noAppointmentsItem);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching appointments: ' + error.message);
        });
    }

    


    //---------------------------------------

    window.finishAppointment = function(button) {
        const listItem = button.parentElement;
        const appointmentId = listItem.getAttribute('data-appointment-id');
        console.log(`appointmentId in client finished: ${appointmentId}`);
        fetch('http://localhost:3000/appointmentComplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appointmentID: appointmentId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                listItem.remove(); // Remove the list item from the DOM
            } else {
                console.error('Error marking appointment as finished console sucka:', data.error);
                console.log(`appointmentId after error: ${appointmentId}`);
                alert('Error marking appointment as finishedd: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error marking appointment as finisheddd: ' + error.message);
        });
    }


    //-------------------------------------------------------------


    fetchAppointments(); // Initial fetch
});
