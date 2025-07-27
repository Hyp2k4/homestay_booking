import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Trỏ đến địa chỉ backend
});

// API cho phòng
export const fetchRooms = () => API.get('/rooms');
export const fetchRoomDetails = (roomId) => API.get(`/rooms/${roomId}`);

// API cho đặt phòng
export const createBooking = (bookingData) => API.post('/bookings', bookingData);