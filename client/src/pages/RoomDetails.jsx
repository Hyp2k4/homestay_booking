import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import formatCurrency from '../../utils/formatCurrency';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
const RoomDetails = () => {
    const { id } = useParams();
    const { rooms, getToken, navigate, axios } = useAppContext();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [isAvailable, setIsAvailable] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const { isLoaded, isSignedIn, user } = useAuth();
    const checkAvailability = async () => {
        try {

            if (checkInDate >= checkOutDate) {
                toast.error('Check-In Date should be less than Check-Out Date')
                return;
            }
            const { data } = await axios.post('/api/bookings/check-availability', { room: id, checkInDate, checkOutDate })
            if (data.success) {
                if (data.isAvailable) {
                    setIsAvailable(true)
                    toast.success('Room is available')
                } else {
                    setIsAvailable(false)
                    toast.error('Room is not available')
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!isAvailable) return;

            if (!isSignedIn) {
                toast.error("You must login to continue booking");
                return;
            }

            const token = await getToken();

            const { data } = await axios.post(
                '/api/bookings/book',
                {
                    room: id,
                    checkInDate,
                    checkOutDate,
                    guests,
                    paymentMethod: "Pay at Homestay",
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (data.success) {
                toast.success(data.message);
                navigate('/my-bookings');
                scrollTo(0, 0);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    useEffect(() => {
        const room = rooms.find(room => room._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, [rooms])

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room.homestay?.name}
                    <span className='font-inter text-sm'> ({room.roomType})</span>
                </h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
            </div>
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>200+ Reviews</p>
            </div>
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.homestay?.address}, </span>
                <span>{room.homestay?.city}</span>

            </div>
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room.images.length > 1 && room.images.map((image, index) => (
                        <img
                            onClick={() => setMainImage(image)}
                            key={index}
                            src={image}
                            alt='Room Image'
                            className={`w-full rounded-xl h-70 shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => {
                            const key = item.toLowerCase().trim();
                            const icon = facilityIcons[key];

                            return (
                                <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                    {icon && <img src={icon} alt={item} className='w-5 h-5' />}
                                    <p className='text-xs'>{item}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <p className='text-2xl font-medium'>{formatCurrency(room.pricePerNight)} VND /night</p>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-x1 mx-auto mt-16 max-w-6x1'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate} type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input onChange={(e) => setGuests(e.target.value)} value={guests} type="number" id='guests' placeholder='1' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' min={1} max={10} required />
                    </div>
                </div>
                <button
                    type='submit'
                    onClick={isAvailable ? onSubmitHandler : checkAvailability}
                    className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'
                >
                    {isAvailable ? "Book Now" : "Check Availability"}
                </button>

            </form>
            <div className='flex flex-row flex-wrap gap-4'>
                <div className='w-full border-y border-gray-300 my-15 py-10 text-gray-500'>
                    <h1 className='font-playfair text-2xl'>Description: </h1>
                    <p>{room.description || "There are no description for this room"}</p>
                </div>
            </div>


            <div className=' space-y-4 flex flex-row flex-wrap gap-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-2'>
                        <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex flex-col items-start gap-4 pt-10'>
                <div className='flex gap-4'>
                    <img src={room.homestay?.owner?.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by: {room.homestay?.name}</p>
                        <div className='flex items-center mt-1 '>
                            <StarRating />
                            <p className='ml-2'> 200+ Reviews</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowContact(!showContact)}
                    className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'
                >
                    Contact Now
                </button>

                {showContact && (
                    <div className='mt-2 text-gray-700 space-y-1'>
                        <p>
                            <strong>Phone: (+84)</strong>  <p className='text-blue-600 '>{room.homestay?.contact || "No phone available"}
                            </p>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoomDetails