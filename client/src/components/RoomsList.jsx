import React, { useEffect } from 'react'
import HomestayCard from './HomestayCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Pagination from './Pagination'
const RoomsList = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('https://homestay-booking-backend.vercel.app/api/rooms');
                setRooms(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

            <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.' />

            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {rooms.slice(0, 4).map((room, index) => (
                    <HomestayCard key={room._id || index} room={room} index={index} />
                ))}
            </div>
                <Pagination></Pagination>
        </div>
    )
}

export default RoomsList