


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
            const activeAppointmentList = document.getElementById('active-appointments');
            activeAppointmentList.innerHTML = ''; // Clear any existing content
            const inactiveAppointmentList = document.getElementById('inactive-appointments');
            inactiveAppointmentList.innerHTML = ''; // Clear any existing content

            if (data.appointments && data.appointments.length > 0) {
                data.appointments.forEach(appointment => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute('data-appointment-id', appointment._id);

                    const nameDiv = document.createElement('div');
                    nameDiv.textContent = `Name: ${appointment.name}`;
                    listItem.appendChild(nameDiv);

                    const dateDiv = document.createElement('div');
                    dateDiv.textContent = `Date: ${formatDate(appointment.date)}`;
                    listItem.appendChild(dateDiv);

                    const timeDiv = document.createElement('div');
                    timeDiv.textContent = `Time: ${appointment.time}`;
                    listItem.appendChild(timeDiv);

                    const phoneDiv = document.createElement('div');
                    phoneDiv.textContent = `Phone: ${appointment.phone}`;
                    listItem.appendChild(phoneDiv);

                    const notesDiv = document.createElement('div');
                    notesDiv.textContent = `Notes: ${appointment.notes}`;
                    listItem.appendChild(notesDiv);                 

                    const buttonDiv = document.createElement('div');

                    if (appointment.status) {
                        const finishButton = document.createElement('button');
                        finishButton.textContent = 'Mark as Finished';
                        finishButton.setAttribute('onclick', 'finishAppointment(this)');
                        buttonDiv.appendChild(finishButton);
                    }

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.setAttribute('onclick', 'deleteAppointment(this)');
                    buttonDiv.appendChild(deleteButton);

                    listItem.appendChild(buttonDiv);

                    if (appointment.status) {
                        activeAppointmentList.appendChild(listItem);
                    } else {
                        inactiveAppointmentList.appendChild(listItem);
                    }
                });
            } else {
                const noAppointmentsItem = document.createElement('li');
                noAppointmentsItem.textContent = 'Empty';
                activeAppointmentList.appendChild(noAppointmentsItem);
                inactiveAppointmentList.appendChild(noAppointmentsItem.cloneNode(true));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching appointments: ' + error.message);
        });
    }

    //---------------------------------------


        // Helper function to format the date
function formatDate(isoString) {
    return isoString.split('T')[0];
        }
    

    //---------------------------------------




//---------------------------------------




window.finishAppointment = function(button) {
    // Disable the button to prevent multiple clicks
    button.disabled = true;
    button.style.backgroundColor = 'grey';

    // Find the closest ancestor <li> element and retrieve the appointment ID
    const listItem = button.closest('li');
    const appointmentId = listItem.getAttribute('data-appointment-id');
    console.log(`appointmentId in client finished: ${appointmentId}`);

    // Make the fetch request to mark the appointment as complete
    fetch('http://localhost:3000/appointmentComplete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointmentID: appointmentId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Remove the list item from the DOM
            listItem.remove();
            // Display success alert
            alert('Appointment marked as completed. Customer has been notified based on your settings.');
        } else {
            // Handle error response from the server
            console.error('Error marking appointment as finished:', data.error);
            console.log(`appointmentId after error: ${appointmentId}`);
            alert('Error marking appointment as finished: ' + data.error);
        }
    })
    .catch(error => {
        // Handle network or other errors
        console.error('Error:', error);
        alert('Error marking appointment as finished: ' + error.message);
    });
}


window.deleteAppointment = function(button) {
    button.disabled = true;
    button.style.backgroundColor = 'grey';
    const listItem = button.closest('li'); // Find the closest ancestor <li> element
    const appointmentId = listItem.getAttribute('data-appointment-id');
    console.log(`appointmentId in client for deletion: ${appointmentId}`);
    fetch(`http://localhost:3000/appointment/${appointmentId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                listItem.remove(); // Remove the list item from the DOM
            } else {
                console.error('Error deleting appointment:', data.error);
                alert('Error deleting appointment: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error deleting appointment:', error);
            alert('Error deleting appointment: ' + error.message);
        });
}


    

    //-------------------------------------------------------------


    fetchAppointments(); // Initial fetch
});
