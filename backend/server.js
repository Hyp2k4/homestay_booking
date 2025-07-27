const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'homestay_booking'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// CORS configuration (nếu cần chi tiết hơn)
app.use(cors({
  origin: 'http://localhost:3000', // Địa chỉ React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  db.query('SELECT * FROM rooms WHERE room_id = ?', [roomId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(results[0]);
  });
});

// Lấy danh sách booking
app.get('/api/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Lấy booking theo ID
app.get('/api/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  db.query('SELECT * FROM bookings WHERE booking_id = ?', [bookingId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(results[0]);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});