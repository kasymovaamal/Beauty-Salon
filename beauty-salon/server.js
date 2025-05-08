const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let appointments = [];
let idCounter = 1;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

// === API Endpoints ===

// GET all appointments
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// POST new appointment
app.post('/api/appointments', (req, res) => {
    const { name, service, date, time } = req.body;
    const newAppointment = { id: idCounter++, name, service, date, time };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

// DELETE appointment by ID
app.delete('/api/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    appointments = appointments.filter(app => app.id !== id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

