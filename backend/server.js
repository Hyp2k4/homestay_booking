const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
app.use(express.json());
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

// Lấy tất cả phòng
app.get('/api/rooms', (req, res) => {
  const query = `
    SELECT r.*, 
      GROUP_CONCAT(s.service_name SEPARATOR ', ') AS services
    FROM rooms r
    LEFT JOIN room_services rs ON r.room_id = rs.room_id
    LEFT JOIN services s ON rs.service_id = s.service_id
    GROUP BY r.room_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Chuyển đổi kết quả services từ string sang array
    const formattedResults = results.map(room => ({
      ...room,
      services: room.services ? room.services.split(', ') : []
    }));

    res.json(formattedResults);
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