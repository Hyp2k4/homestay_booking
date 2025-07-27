import React, { useState, useEffect } from 'react';
import { fetchRooms, createBooking } from '../api';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    roomType: '',
    bedType: '',
    maxPrice: '',
  });
  const [sortOption, setSortOption] = useState('price-asc');

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
        userId: 1,
        roomId,
        checkIn: '2023-12-01',
        checkOut: '2023-12-05'
      };
      
      const response = await createBooking(bookingData);
      alert(`Đặt phòng thành công! Mã booking: ${response.data.bookingId}`);
      
      // Refresh danh sách phòng sau khi đặt
      const updatedResponse = await fetchRooms();
      setRooms(updatedResponse.data);
    } catch (err) {
      alert('Đặt phòng thất bại: ' + err.message);
    }
  };

  // Áp dụng filter
  const filteredRooms = rooms.filter(room => {
    return (
      (filter.roomType === '' || room.room_type === filter.roomType) &&
      (filter.bedType === '' || room.bed_type === filter.bedType) &&
      (filter.maxPrice === '' || room.price_per_night <= filter.maxPrice)
    );
  });

  // Áp dụng sort
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch(sortOption) {
      case 'price-asc': return a.price_per_night - b.price_per_night;
      case 'price-desc': return b.price_per_night - a.price_per_night;
      case 'room-number': return a.room_number.localeCompare(b.room_number);
      default: return 0;
    }
  });

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = sortedRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="room-list">
      <h2>Danh sách phòng</h2>
      
      {/* Filter controls */}
      <div className="controls">
        <select 
          value={filter.roomType}
          onChange={(e) => setFilter({...filter, roomType: e.target.value})}
        >
          <option value="">Tất cả loại phòng</option>
          <option value="VIP">VIP</option>
          <option value="Standard">Standard</option>
        </select>
        
        <select
          value={filter.bedType}
          onChange={(e) => setFilter({...filter, bedType: e.target.value})}
        >
          <option value="">Tất cả loại giường</option>
          <option value="single">Giường đơn</option>
          <option value="couple">Giường đôi</option>
        </select>
        
        <input
          type="number"
          placeholder="Giá tối đa"
          value={filter.maxPrice}
          onChange={(e) => setFilter({...filter, maxPrice: e.target.value})}
        />
        
        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="room-number">Số phòng</option>
        </select>
      </div>
      
      {/* Rooms list */}
      <div className="rooms-container">
        {currentRooms.map(room => (
          <div key={room.room_id} className="room-card">
            <h3>{room.room_number}</h3>
            <p>Loại: {room.room_type}</p>
            <p>Giường: {room.bed_type === 'single' ? 'Đơn' : 'Đôi'}</p>
            <p>Giá: {room.price_per_night.toLocaleString()} VND/đêm</p>
            <p>Trạng thái: {room.status}</p>
            <button 
              onClick={() => handleBookRoom(room.room_id)}
              disabled={room.status !== 'available'}
              className={room.status === 'available' ? 'book-btn' : 'disabled-btn'}
            >
              {room.status === 'available' ? 'Đặt phòng' : 'Không khả dụng'}
            </button>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedRooms.length / roomsPerPage) }).map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoomList;