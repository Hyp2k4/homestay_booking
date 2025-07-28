import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Rooms.css';
import Hero from '../components/Hero';
import Pagination from '../components/Pagination';
import Title from '../components/Title';
import HomestayCard from '../components/HomestayCard';

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

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    


    return (
        <>
            <Hero imageUrl="https://images.pexels.com/photos/2162220/pexels-photo-2162220.jpeg" showSearchForm={false} />
            <div className="rooms-page">
                <Title title='Danh Sách Phòng'></Title>
                
            </div>
        </>
    );
};

export default Rooms;
