import React, { useState, useEffect } from 'react';
import { fetchRooms, createBooking } from '../api';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await fetchRooms();
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadRooms();
  }, []);

  const handleBookRoom = async (roomId) => {
    try {
      const bookingData = {
        userId: 1, // Thay bằng ID user thực tế từ auth
        roomId,
        checkIn: '2023-12-01', // Thay bằng ngày từ form
        checkOut: '2023-12-05'  // Thay bằng ngày từ form
      };
      
      const response = await createBooking(bookingData);
      alert(`Đặt phòng thành công! Mã booking: ${response.data.bookingId}`);
    } catch (err) {
      alert('Đặt phòng thất bại: ' + err.message);
    }
  };

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="room-list">
      <h2>Danh sách phòng</h2>
      <div className="rooms-container">
        {rooms.map(room => (
          <div key={room.room_id} className="room-card">
            <h3>{room.room_number}</h3>
            <p>Loại: {room.room_type}</p>
            <p>Giường: {room.bed_type === 'single' ? 'Đơn' : 'Đôi'}</p>
            <p>Giá: {room.price_per_night.toLocaleString()} VND/đêm</p>
            <p>Trạng thái: {room.status}</p>
            <button 
              onClick={() => handleBookRoom(room.room_id)}
              disabled={room.status !== 'available'}
            >
              {room.status === 'available' ? 'Đặt phòng' : 'Không khả dụng'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;