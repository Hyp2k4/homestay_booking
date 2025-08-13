import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import formatCurrency from '../../utils/formatCurrency';
const HomestayCard = ({ room, index }) => {
    return (
        <Link to={'/rooms/' + room._id} onClick={() => scrollTo(0, 0)} key={room._id}
            className='relative w-full max-w-70 bg-white rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <img
                src={room.images[0]}
                alt=""
                className="h-[200px] w-full object-cover"
            />
            {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Best Choice</p>}
            <div className='p-4 pt-5'>
                <div className='flex items-center justify-between'>
                    <p className='font-playfair text-xl font-medium text-gray-800'>{room.homestay?.name}</p>
                    <div className='flex items-center gap-1'>
                        <img src={assets.starIconFilled} alt="start-icon" /> 4.5
                    </div>
                </div>
                <div className='flex items-center gap-1 text-sm'>
                    <img src={assets.locationIcon} alt="location-icon" /> <span>{room.homestay?.address}</span>
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <p><span className='text-xl text-gray-800'>{formatCurrency(room.pricePerNight)}</span> /night</p>
                    <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now</button>
                </div>
            </div>
        </Link>
    )
}

export default HomestayCard