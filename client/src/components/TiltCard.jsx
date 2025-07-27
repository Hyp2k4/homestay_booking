import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';

const TiltCard = ({
  room,
  onBookClick
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const threshold = 12;

  const handleMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({
      x: y * -threshold,
      y: x * threshold
    });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <img
        src={room.room_image || 'https://images.unsplash.com/photo-1747134392471-831ea9a48e1e?q=80&w=2000&auto=format&fit=crop'}
        alt={`Phòng ${room.room_number}`}
        className="w-full h-52 object-cover"
      />

      <div className="px-4 pt-3 pb-6">
        <h3 className="mt-3 mb-1 text-lg font-semibold text-gray-800">
          Phòng {room.room_number}
        </h3>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {room.room_type === 'VIP' ? '⭐ VIP' : '🏨 Standard'}
          </span>
          <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
            {room.bed_type === 'single' ? 'Giường đơn' : 'Giường đôi'}
          </span>
        </div>

        <p className="text-lg font-bold text-gray-900 mb-2">
          {formatCurrency(room.price_per_night) || '0'} VND/đêm
        </p>
        <p className="text-sm text-gray-600 mb-4" title={room.description}>
          {room.description || 'Mô tả phòng chưa có.'}
        </p>

        <p className={`text-sm mb-4 ${room.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
          {room.status === 'available' ? '🟢 Có sẵn' : '🔴 Đã đặt'}
        </p>

        <button
          className={`w-full py-2 rounded-lg font-medium transition-all ${room.status !== 'available'
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }`}
          disabled={room.status !== 'available'}
          onClick={() => onBookClick(room.room_id)}
        >
          {room.status === 'available' ? 'Đặt ngay' : 'Hết phòng'}
        </button>
      </div>
    </div>
  );
};

TiltCard.propTypes = {
  room: PropTypes.object.isRequired,
  onBookClick: PropTypes.func.isRequired
};

export default TiltCard;