import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Pagination from '../components/Pagination';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import formatCurrency from '../../utils/formatCurrency';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/rooms');
                const result = await res.json();
                console.log('rooms data:', result);
                setRooms(result.data || []); // ✅ Lấy đúng mảng từ kết quả trả về
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch rooms:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Hero imageUrl="https://images.pexels.com/photos/2162220/pexels-photo-2162220.jpeg" showSearchForm={false} />
            <div className="rooms-page max-w-screen-xl mx-auto px-4 py-10">
                <Title title="All Rooms" />

                {loading ? (
                    <p className="text-center mt-20">Loading rooms...</p>
                ) : error ? (
                    <p className="text-center mt-20 text-red-500">Failed to load rooms.</p>
                ) : (
                    <>
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
                            {currentRooms.map((room) => (
                                <Link
                                    to={`/rooms/${room.id}`} // ⚠️ room.id thay vì RoomID
                                    onClick={() => scrollTo(0, 0)}
                                    key={room.id}
                                    className="relative w-full max-w-70 bg-white rounded-xl overflow-hidden text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                >
                                    {room.mainImage ? (
                                        <img
                                            src={room.mainImage}
                                            alt={`Room ${room.name}`}
                                            className="h-[200px] w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-[200px] w-full bg-gray-200 animate-pulse" />
                                    )}

                                    <div className="p-4 pt-5">
                                        <div className="flex items-center justify-between">
                                            <p className="font-playfair text-xl font-medium text-gray-800">
                                                Room {room.number}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" />
                                                <span>4.5</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm mt-1">
                                            <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
                                            <span>{room.address || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <p>
                                                <span className="text-xl text-gray-800">
                                                    {formatCurrency(room.price)}
                                                </span>{' '}
                                                VND /night
                                            </p>
                                            <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
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

export default AllRooms;
