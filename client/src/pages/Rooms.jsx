import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TiltCard from '../components/TiltCard';
import './Rooms.css';
import Hero from '../components/Hero';
import Pagination from '../components/Pagination';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8); // 8 items per page

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setRooms(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Get current rooms
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleBookClick = (roomId) => {
        console.log('Đặt phòng:', roomId);
        alert(`Bạn đã đặt phòng ${roomId} thành công!`);
    };

    if (loading) return <div className="loading">Loading rooms...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <>
            <Hero imageUrl="https://images.pexels.com/photos/2162220/pexels-photo-2162220.jpeg" height='50vh'/>
            <div className="rooms-page">
                <h1>Danh Sách Phòng</h1>
                {rooms.length === 0 ? (
                    <div className="no-rooms">Không có phòng nào được tìm thấy</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentRooms.map(room => (
                                <TiltCard
                                    key={room.room_id}
                                    room={room}
                                    onBookClick={handleBookClick}
                                />
                            ))}
                        </div>

                        {/* Pagination centered */}
                        <div className="flex justify-center mt-8">
                            <Pagination
                                totalPages={Math.ceil(rooms.length / roomsPerPage)}
                                onPageChange={paginate}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Rooms;
