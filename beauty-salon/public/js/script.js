document.getElementById('appointment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const appointment = {
        name: document.getElementById('customer-name').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    // Send to backend (API call)
    const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
    });

    if (response.ok) {
        alert('Appointment booked!');
        loadAppointments(); // Refresh list
    } else {
        alert('Error booking appointment.');
    }
});

// Load appointments from backend
async function loadAppointments() {
    const response = await fetch('/api/appointments');
    const appointments = await response.json();

    const container = document.getElementById('appointments');
    container.innerHTML = '';

    appointments.forEach(app => {
        const card = document.createElement('div');
        card.className = 'appointment-card';
        card.innerHTML = `
            <p><strong>${app.name}</strong></p>
            <p>Service: ${app.service}</p>
            <p>Date: ${app.date} at ${app.time}</p>
            <button onclick="deleteAppointment(${app.id})">Delete</button>
        `;
        container.appendChild(card);
    });
}

// Delete appointment
async function deleteAppointment(id) {
    const confirmDelete = confirm('Are you sure you want to delete this appointment?');
    if (!confirmDelete) return;

    const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Appointment deleted!');
        loadAppointments();
    } else {
        alert('Failed to delete appointment.');
    }
}

// Initial load
loadAppointments();