import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formatCurrency from '../../utils/formatCurrency';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RoomDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState('');
    const [bookingDates, setBookingDates] = useState({
        checkIn: "",
        checkOut: ""
    }); const [guestCount, setGuestCount] = useState({ adults: 1, children: '' });
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [hoveredImage, setHoveredImage] = useState(null); // Hover image state
    const navigate = useNavigate();
    const [isBooking, setIsBooking] = useState(false);
    const [bookingError, setBookingError] = useState(null);

    const handleBookNow = async () => {
        if (!user) {
            navigate('/login', { state: { from: `/rooms/${room.id}` } });
            return;
        }

        try {
            setLoading(true);

            // Gọi API tạo booking mới (đúng endpoint)
            const response = await axios.post('http://localhost:5000/api/bookings', {
                room_id: room.id,
                user_id: user.user_id,
                check_in_date: bookingDates.checkIn,
                check_out_date: bookingDates.checkOut,
                adults: guestCount.adults,
                children: guestCount.children || 0
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });


            if (response.data.success) {
                // Chuyển hướng đến trang my-bookings sau khi đặt thành công
                navigate('/my-bookings', {
                    state: {
                        bookingSuccess: true,
                        booking: response.data.booking
                    }
                });
            }
        } catch (error) {
            console.error('Booking error:', error);
            setError(error.response?.data?.message || 'Failed to book room');
        } finally {
            setLoading(false);
        }
    };



    if (loading) return <div className="p-10 text-center">Loading room details...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!room) return <div className="p-10 text-center">Room not found</div>;

    return (
        <div className="pt-30 max-w-screen-xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Room {room.RoomName} - {room.RoomType}</h1>

            {/* Main Image and Gallery */}
            <div className="mb-8">
                {/* Main Image */}
                <div className="flex justify-center">
                    <div className="inline-block max-w-[800px] max-h-[500px] rounded-xl overflow-hidden shadow-lg mb-4">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={hoveredImage || mainImage} // key quan trọng để Framer Motion detect thay đổi ảnh
                                src={hoveredImage || mainImage}
                                alt={`Room ${room.RoomName}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-auto h-auto object-contain"
                            />
                        </AnimatePresence>
                    </div>
                </div>


                {/* Preview Images */}
                <div className="grid grid-cols-3 gap-4">
                    {room.previewImages.slice(0, 3).map((img, index) => (
                        <motion.div
                            key={index}
                            onMouseEnter={() => setHoveredImage(img)}
                            onMouseLeave={() => setHoveredImage(null)}
                            whileHover={{ scale: 1.05 }}
                            className={`cursor-pointer rounded-lg overflow-hidden transition-all ${hoveredImage === img ? 'ring-4 ring-blue-500' : 'hover:opacity-80'
                                }`}
                        >
                            <motion.img
                                src={img}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-50 object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Room Information */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-gray-700 mb-6">
                        {room.Description || 'No description available for this room.'}
                    </p>

                    <h2 className="text-xl font-semibold mb-4">Room Features</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-blue-500">•</span>
                            <span>Room Size: {room.Size || 'N/A'} m²</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-500">•</span>
                            <span>Max Guests: {room.max_guests || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-500">•</span>
                            <span>Bed Type: {room.bed_type === 'single' ? 'Single' : 'Double'}</span>
                        </div>
                    </div>
                </div>

                {/* Booking Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Book This Room</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Price per night:</span>
                            <span className="text-xl text-gray-800">
                                {formatCurrency(room.PricePerNight)}VND /night
                            </span>
                        </div>

                        <div className="pt-4 border-t hover">
                            <button onClick={handleBookNow} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer hover:bg-gray-100">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
