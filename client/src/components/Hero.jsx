import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { assets, cities } from '../assets/assets';

const Hero = ({
    imageUrl = "/src/assets/heroImage.png",
    title,
    subtitle,
    height = '100vh',
    showSearchForm = true,
    children
}) => {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!destination || !checkIn || !checkOut || !guests) {
            alert("Please fill in all fields.");
            return;
        }

        if (checkOut < checkIn) {
            alert("Check-out date cannot be before check-in date.");
            return;
        }

        // Submit logic here...
        console.log({ destination, checkIn, checkOut, guests });
    };

    return (
        <div
            className="relative w-full"
            style={{
                height: height,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                <div className="text-center mb-8 text-white">
                    {children ? (
                        children
                    ) : (
                        <>
                            {title && (
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {title}
                                </h1>
                            )}
                            {subtitle && (
                                <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">
                                    {subtitle}
                                </p>
                            )}
                        </>
                    )}
                </div>

                {/* Search Form */}
                {showSearchForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto w-full max-w-4xl shadow-xl ml-4 md:ml-12"
                    >
                        {/* Destination */}
                        <div className="flex-1">
                            <div className='flex items-center gap-2'>
                                <img src={assets.calenderIcon} alt="" className='h-4' />
                                <label htmlFor="destinationInput">Destination</label>
                            </div>
                            <input
                                list='destinations'
                                id="destinationInput"
                                type="text"
                                className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                                placeholder="Type here"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                required
                            />
                            <datalist id='destinations'>
                                {cities.map((city, index) => (
                                    <option value={city} key={index}></option>
                                ))}
                            </datalist>
                        </div>

                        {/* Check In */}
                        <div className="flex-1">
                            <div className='flex items-center gap-2'>
                                <img src={assets.calenderIcon} alt="" className='h-4' />
                                <label htmlFor="checkIn">Check in</label>
                            </div>
                            <input
                                id="checkIn"
                                type="date"
                                className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                                min={today}
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                required
                            />
                        </div>

                        {/* Check Out */}
                        <div className="flex-1">
                            <div className='flex items-center gap-2'>
                                <img src={assets.calenderIcon} alt="" className='h-4' />
                                <label htmlFor="checkOut">Check out</label>
                            </div>
                            <input
                                id="checkOut"
                                type="date"
                                className="w-full rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                                min={checkIn || today}
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                required
                            />
                        </div>

                        {/* Guests */}
                        <div className="flex-1 flex md:flex-col max-md:gap-2 max-md:items-center">
                            <label htmlFor="guests">Guests</label>
                            <input
                                id="guests"
                                type="number"
                                min={1}
                                max={4}
                                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
                                placeholder="0"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1 hover:bg-gray-800 transition-colors'
                        >
                            <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
                            <span>Search</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

Hero.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    height: PropTypes.string,
    showSearchForm: PropTypes.bool,
    children: PropTypes.node
};

export default Hero;
