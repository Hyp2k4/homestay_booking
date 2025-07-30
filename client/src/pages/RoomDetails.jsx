import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formatCurrency from '../../utils/formatCurrency';
import { motion, AnimatePresence } from 'framer-motion';

const RoomDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [hoveredImage, setHoveredImage] = useState(null); // Hover image state

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch room info
                const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
                const roomData = response.data.data;
                // Fetch preview images
                const imgRes = await axios.get(`http://localhost:5000/api/room-images/${roomId}`);
                let previewImages = [];

                if (imgRes.data.success && Array.isArray(imgRes.data.data)) {
                    previewImages = imgRes.data.data.flatMap((item) => {
                        try {
                            // Nếu item là chuỗi JSON mảng
                            const parsed = JSON.parse(item);
                            if (Array.isArray(parsed)) return parsed;
                        } catch (_) {
                            // Nếu không phải JSON, return item
                        }
                        return [item];
                    });
                } console.log('Preview images:', previewImages);
                setRoom({
                    ...roomData,
                    previewImages: previewImages.length > 0
                        ? previewImages
                        : [
                            'https://via.placeholder.com/400x300?text=Preview+1',
                            'https://via.placeholder.com/400x300?text=Preview+2',
                            'https://via.placeholder.com/400x300?text=Preview+3',
                        ]
                });

                setMainImage(roomData.MainImage || 'https://via.placeholder.com/800x500?text=No+Room+Image');
            } catch (err) {
                console.error('Error fetching room:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch room details');
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);


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
                            <span className="text-lg font-bold text-blue-600">
                                {formatCurrency(room.PricePerNight)}VND /night
                            </span>
                        </div>

                        <div className="pt-4 border-t">
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                onClick={() => alert(`Proceeding to book room ${room.RoomName}`)}
                            >
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
