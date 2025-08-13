import axios from 'axios';

const API = axios.create({
  baseURL: 'https://homestay-booking-backend.vercel.app/',
});

// API cho phòng
export const fetchRooms = () => API.get('/rooms');
export const fetchRoomDetails = (id) => API.get(`/rooms/${id}`);

// API cho đặt phòng
export const createBooking = (bookingData) => API.post('/bookings', bookingData);