import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const userId = storedUser?.user_id;

                if (!userId) return;

                const res = await fetch(`http://localhost:5000/api/bookings?user_id=${userId}`);
                const data = await res.json();
                setBookings(data.data || []); // 👈 Sửa chỗ này
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);


    if (loading) return <div className="py-28 text-center">Loading your bookings...</div>;

    return (
        <div className='py-28 md:pd-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
            <Title
                title="My Bookings"
                subTitle="Easily manage your past, current, and upcoming homestay reservations in one place. Plan your trips seamlessly with just a few clicks"
                algin='left'
            />

            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                    <div className='w-1/3'>Homestay</div>
                    <div className='w-1/3'>Date & Timings</div>
                    <div className='w-1/3'>Payment</div>
                </div>

                {bookings.map((booking) => (
                    <div key={booking.booking_id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                        <div className='flex flex-col md:flex-row'>
                            <img
                                src={booking.rooms?.main_image[0] || 'https://via.placeholder.com/150'}
                                alt='homestay-img'
                                className='min-md:w-44 rounded shadow object-cover'
                            />
                            <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                                <p className='text-2xl font-playfair'>
                                    {booking.rooms?.room_number || 'Homestay'} <span className='font-inter text-sm'>({booking.room?.roomType})</span>
                                </p>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.locationIcon} alt='location-icon' />
                                    <span>{booking.hotel?.address || 'Unknown Address'}</span>
                                </div>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.guestsIcon} alt='guests-icon' />
                                    <span>Guest: {booking.guests || 1}</span>
                                </div>
                                <p className='text-base'>Totals: ${booking.total_price}</p>
                            </div>
                        </div>

                        <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                            <div>
                                <p>Check-In: </p>
                                <p className='text-gray-500 text-sm'>{new Date(booking.check_in).toDateString()}</p>
                            </div>
                            <div>
                                <p>Check-Out: </p>
                                <p className='text-gray-500 text-sm'>{new Date(booking.check_out).toDateString()}</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start justify-center pt-3'>
                            <div className='flex items-center gap-3'>
                                <div className={`h-3 w-3 rounded-full ${booking.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <p className={`text-sm ${booking.payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                                    {booking.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                </p>
                            </div>

                            {booking.payment_status !== 'paid' && (
                                <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                                    Pay Now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
