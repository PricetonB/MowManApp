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

                    const buttonDiv = document.createElement('div');

                    if (appointment.status) {
                        const finishButton = document.createElement('button');
                        finishButton.textContent = 'Mark as Finished';
                        finishButton.setAttribute('onclick', 'finishAppointment(this)');
                        buttonDiv.appendChild(finishButton);
                    }

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Details';
                    editButton.setAttribute('onclick', 'editAppointment(this)');
                    buttonDiv.appendChild(editButton);

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
    const listItem = button.closest('li'); // Find the closest ancestor <li> element
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
