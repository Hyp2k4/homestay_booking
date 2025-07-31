const express = require('express');
const mysql = require('mysql2/promise'); // Sử dụng promise-based API
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const app = express();
app.use(session({
  secret: 'your-secret-key',           // nên đặt trong biến môi trường
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,   // true nếu dùng HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 1 ngày
  }
}));

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Kết nối database
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'homestaybookingsystem',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Kiểm tra kết nối database
pool.getConnection()
  .then(conn => {
    console.log('Connected to database');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// API Endpoints

// Upload ảnh chính
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    if (!req.body.room_id) return res.status(400).json({ success: false, message: 'room_id is required' });

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const [result] = await pool.query(
      'UPDATE Rooms SET MainImage = ? WHERE RoomID = ?',
      [fileUrl, req.body.room_id]
    );

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: { imageUrl: fileUrl }
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Upload nhiều ảnh preview
app.post('/api/upload-multiple', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: 'No files uploaded' });
    if (!req.body.room_id) return res.status(400).json({ success: false, message: 'room_id is required' });

    const fileUrls = req.files.map(file =>
      `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    );

    const [result] = await pool.query(
      'UPDATE Rooms SET PreviewImages = ? WHERE RoomID = ?',
      [JSON.stringify(fileUrls), req.body.room_id]
    );

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: { imageUrls: fileUrls }
    });
  } catch (err) {
    console.error('Multiple upload error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// API Rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const query = `
      SELECT 
        r.RoomID, r.RoomName, r.RoomNumber, r.RoomTypeID,
        rt.TypeName AS RoomType, r.Description, r.Size,
        r.MainImage, r.PricePerNight,
        r.DiscountRate, r.Floor, r.ViewDescription,
        r.IsFeatured, r.IsAvailable,
        GROUP_CONCAT(DISTINCT a.AmenityName SEPARATOR '|') AS Amenities
      FROM Rooms r
      LEFT JOIN RoomTypes rt ON r.RoomTypeID = rt.RoomTypeID
      LEFT JOIN RoomAmenities ra ON r.RoomID = ra.RoomID
      LEFT JOIN Amenities a ON ra.AmenityID = a.AmenityID
      WHERE r.IsAvailable = 1
      GROUP BY r.RoomID
    `;

    const [rooms] = await pool.query(query);

    const formattedRooms = rooms.map(room => ({
      id: room.RoomID,
      name: room.RoomName,
      number: room.RoomNumber,
      typeId: room.RoomTypeID,
      type: room.RoomType,
      description: room.Description,
      size: room.Size,
      mainImage: room.MainImage || '/images/default-room.jpg',
      price: room.PricePerNight,
      discount: room.DiscountRate,
      floor: room.Floor,
      view: room.ViewDescription,
      isFeatured: Boolean(room.IsFeatured),
      isAvailable: Boolean(room.IsAvailable),
      amenities: room.Amenities ? room.Amenities.split('|') : [],
    }));

    res.json({ success: true, data: formattedRooms });
  } catch (err) {
    console.error('Get rooms error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rooms',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// API Room Detail
app.get('/api/rooms/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const [rooms] = await pool.query(`
      SELECT 
        r.*, rt.TypeName AS RoomType,
        GROUP_CONCAT(DISTINCT a.AmenityName SEPARATOR '|') AS Amenities
      FROM Rooms r
      LEFT JOIN RoomTypes rt ON r.RoomTypeID = rt.RoomTypeID
      LEFT JOIN RoomAmenities ra ON r.RoomID = ra.RoomID
      LEFT JOIN Amenities a ON ra.AmenityID = a.AmenityID
      WHERE r.RoomID = ?
      GROUP BY r.RoomID
    `, [roomId]);

    if (!rooms.length) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const room = rooms[0];
    const formattedRoom = {
      ...room,
      PreviewImages: room.PreviewImages ? JSON.parse(room.PreviewImages) : [],
      Amenities: room.Amenities ? room.Amenities.split('|') : []
    };

    res.json({ success: true, data: formattedRoom });
  } catch (err) {
    console.error('Get room detail error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room details',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.get('/api/room-images/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const [results] = await pool.query(
      'SELECT ImageURL FROM RoomImages WHERE RoomID = ? ORDER BY DisplayOrder ASC',
      [roomId]
    );

    const imageUrls = results.map(r => r.ImageURL);
    res.json({ success: true, data: imageUrls });
  } catch (err) {
    console.error('Get room images error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

//Review Rating
// API lấy phòng có rating cao nhất
app.get('/api/top-rated-rooms', async (req, res) => {
  try {
    const query = `
      SELECT 
        r.RoomID,
        r.RoomName,
        r.RoomNumber,
        r.MainImage,
        r.PricePerNight,
        r.DiscountRate,
        rt.TypeName AS RoomType,
        AVG(rev.Rating) AS AverageRating,
        COUNT(rev.ReviewID) AS ReviewCount
      FROM Rooms r
      LEFT JOIN RoomTypes rt ON r.RoomTypeID = rt.RoomTypeID
      LEFT JOIN Reviews rev ON r.RoomID = rev.RoomID
      WHERE r.IsAvailable = 1 AND rev.IsApproved = 1
      GROUP BY r.RoomID, r.RoomName, r.RoomNumber, r.MainImage, r.PricePerNight, r.DiscountRate, rt.TypeName
      HAVING AVG(rev.Rating) >= 4.5
      ORDER BY AverageRating DESC, ReviewCount DESC
      LIMIT 10
    `;

    const [results] = await pool.query(query);

    const formattedRooms = results.map(room => ({
      id: room.RoomID,
      name: room.RoomName,
      number: room.RoomNumber,
      image: room.MainImage || '/images/default-room.jpg',
      price: room.PricePerNight,
      discount: room.DiscountRate,
      type: room.RoomType,
      rating: parseFloat(room.AverageRating).toFixed(1),
      reviewCount: room.ReviewCount
    }));

    res.json({ success: true, data: formattedRooms });
  } catch (err) {
    console.error('Top rated rooms error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top rated rooms'
    });
  }
});


// API Login
app.post('/api/sync-user', async (req, res) => {
  const {
    userID,
    username,
    password,
    email,
    fullName,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
    avatar,
    roleID,
    isActive,
    createdAt,
    updatedAt,
    lastLogin
  } = req.body;
  console.log("Request body:", req.body);
  try {
    const [rows] = await db.execute(
      `INSERT INTO Users 
            (UserID, Username, Password, Email, FullName, PhoneNumber, Address, DateOfBirth, Gender, Avatar, RoleID, IsActive, CreatedAt, UpdatedAt, LastLogin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                Username = VALUES(Username),
                Email = VALUES(Email),
                FullName = VALUES(FullName),
                PhoneNumber = VALUES(PhoneNumber),
                UpdatedAt = VALUES(UpdatedAt),
                LastLogin = VALUES(LastLogin);`,
      [
        userID,
        username,
        password,
        email,
        fullName,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        avatar,
        roleID,
        isActive,
        createdAt,
        updatedAt,
        lastLogin
      ]
    );

    res.status(200).json({ message: 'User synced successfully' });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});




app.get('/api/check-auth', (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  res.json({ loggedIn: false });
});


// API Bookings
// Endpoint tạo booking mới
app.post('/api/bookings', async (req, res) => {
  try {
    const { room_id, user_id, check_in_date, check_out_date, adults, children } = req.body;

    // 1. Kiểm tra phòng có sẵn
    const [room] = await pool.query(
      'SELECT * FROM Rooms WHERE RoomID = ? AND IsAvailable = 1',
      [room_id]
    );

    if (!room.length) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available'
      });
    }

    // 2. Tính tổng giá
    const nights = Math.ceil(
      (new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24)
    );
    const total_price = room[0].PricePerNight * nights;

    // 3. Tạo booking
    const [result] = await pool.query(
      `INSERT INTO Bookings (
        BookingCode, UserID, RoomID, 
        CheckInDate, CheckOutDate, 
        Adults, Children, TotalPrice, Status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `BOOK-${Date.now()}`,
        user_id,
        room_id,
        check_in_date,
        check_out_date,
        adults,
        children,
        total_price,
        'confirmed'
      ]
    );

    // 4. Cập nhật trạng thái phòng (tùy chọn)
    await pool.query(
      'UPDATE Rooms SET IsAvailable = 0 WHERE RoomID = ?',
      [room_id]
    );

    res.json({
      success: true,
      booking: {
        booking_id: result.insertId,
        room_id,
        check_in_date,
        check_out_date,
        total_price
      }
    });

  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});