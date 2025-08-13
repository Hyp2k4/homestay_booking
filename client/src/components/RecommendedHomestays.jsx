import React, { useEffect, useState } from 'react'
import HomestayCard from './HomestayCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'


const RecommendedHomestays = () => {
    const { rooms, searchedCities } = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHomestays = () => {
        const filteredHomestays = rooms.slice().filter(room => searchedCities.includes(room.homestay.city))
        setRecommended(filteredHomestays)
    }

    useEffect(() => {
        filterHomestays()
    }, [rooms, searchedCities])
    return recommended.length > 0 && (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

            <Title title='Recommended Homestays' subTitle='Discover our handpicked selection of exceptinal properties around the world, offering unparalleled luxury' />

            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {recommended.slice(0, 4).map((room, index) => (
                    <HomestayCard key={room._id} room={room} index={index} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedHomestays