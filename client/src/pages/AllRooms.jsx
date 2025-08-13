import React, { useMemo, useState } from 'react';
import { assets, facilityIcons } from '../assets/assets';
import { useSearchParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import formatCurrency from '../../utils/formatCurrency';
import { useAppContext } from '../context/AppContext';

const AllRooms = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { rooms, navigate } = useAppContext();

    const [openFilters, setOpenFilters] = useState(false);
    const [selectedFilters, setSelectedFilter] = useState({
        RoomTypes: [],
        priceRanges: [],
    });
    const [selectedSort, setSelectedSort] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 5;

    const RoomTypes = [
        "Single Bed",
        "Double Bed",
        "Deluxe Room",
        "Family Room",
    ];
    const priceRanges = [
        "Under 500,000 VND",
        "500,000 - 1,000,000 VND",
        "1,000,000 - 2,000,000 VND",
        "2,000,000 - 3,000,000 VND",
        "Over 3,000,000 VND"
    ];
    const sortOptions = [
        "Price: Low to High",
        "Price: High to Low",
        "Newest First",
    ];

    const handleFilterChange = (checked, value, type) => {
        setSelectedFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (checked) {
                updatedFilters[type].push(value);
            } else {
                updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
            }
            return updatedFilters;
        });
        setCurrentPage(1);
    };

    const handleSortChange = (sortOptions) => {
        setSelectedSort(sortOptions);
        setCurrentPage(1);
    };

    const matchesRoomType = (room) => {
        return selectedFilters.RoomTypes.length === 0 || selectedFilters.RoomTypes.includes(room.roomType);
    };

    const matchesPriceRange = (room) => {
        if (selectedFilters.priceRanges.length === 0) return true;
        return selectedFilters.priceRanges.some(range => {
            let min = 0, max = Infinity;
            if (range.startsWith("Under")) {
                max = parseInt(range.replace(/[^\d]/g, ""));
            } else if (range.startsWith("Over")) {
                min = parseInt(range.replace(/[^\d]/g, ""));
            } else {
                const [minStr, maxStr] = range
                    .replace(/ VND/g, "")
                    .split(" - ")
                    .map(s => s.replace(/[^\d]/g, ""));
                min = parseInt(minStr);
                max = parseInt(maxStr);
            }
            return room.pricePerNight >= min && room.pricePerNight <= max;
        });
    };

    const sortRooms = (a, b) => {
        if (selectedSort === 'Price: Low to High') {
            return a.pricePerNight - b.pricePerNight;
        } else if (selectedSort === 'Price: High to Low') {
            return b.pricePerNight - a.pricePerNight;
        } else if (selectedSort === 'Newest First') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
    };

    const filterDestination = (room) => {
        const destination = searchParams.get('destination');
        if (!destination) return true;
        return room.homestay.city.toLowerCase().includes(destination.toLocaleLowerCase());
    };

    const filteredRooms = useMemo(() => {
        return rooms
            .filter(room => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room))
            .sort(sortRooms);
    }, [rooms, selectedFilters, selectedSort, searchParams]);

    // Pagination logic
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    const clearFilters = () => {
        setSelectedFilter({
            RoomTypes: [],
            priceRanges: []
        });
        setSelectedSort('');
        setSearchParams({});
        setCurrentPage(1);
    };

    const CheckBox = ({ label, selected = false, onChange = () => { } }) => (
        <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
            <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} className='w-4 h-4 accent-blue-500' />
            <span className='font-light select-none'>{label}</span>
        </label>
    );

    const RadioButton = ({ label, selected = false, onChange = () => { } }) => (
        <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
            <input type="radio" name='sortOption' checked={selected} onChange={() => onChange(label)} className='w-4 h-4 accent-blue-500' />
            <span className='font-light select-none'>{label}</span>
        </label>
    );

    // Custom Pagination UI
    const Pagination = () => (
        <div className="flex items-center justify-center w-full max-w-80 mx-auto mt-10 mb-20 text-gray-500 font-medium">
            <button
                type="button"
                aria-label="prev"
                className="rounded-full bg-slate-200/50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
                </svg>
            </button>

            <div className="flex items-center gap-2 text-sm font-medium">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 flex items-center justify-center aspect-square ${currentPage === page ? "text-indigo-500 border border-indigo-200 rounded-full" : ""}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                aria-label="next"
                className="rounded-full bg-slate-200/50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
                <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
                </svg>
            </button>
        </div>
    );

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            <div>
                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Homestay Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                    </p>
                </div>

                {currentRooms.map((room) => (
                    <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last: pb-30 last:border-0'>
                        <img
                            onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
                            src={room.images[0]}
                            alt="homestay-img"
                            title='View Room Details'
                            className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
                        />
                        <div className='md:1/2 flex flex-col gap-2'>
                            <p className='text-gray-500'>{room.homestay?.city}</p>
                            <p onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }} className='text-gray-800 text-3xl font-playfair cursor-pointer'>
                                {room.homestay?.name}
                            </p>
                            <div className='flex items-center'>
                                <StarRating />
                                <p className='ml-2'>200+ Reviews</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                <img src={assets.locationIcon} alt="location-icon" />
                                <span>{room.homestay?.address}</span>
                            </div>
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
                            <p className='text-xl font-medium text-gray-700'>{formatCurrency(room.pricePerNight)} VND /night</p>
                        </div>
                    </div>
                ))}

                {/* Custom Pagination */}
                {totalPages > 1 && <Pagination />}
            </div>

            {/* Filters */}
            <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16 
                lg:sticky lg:top-40'>
                <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='text-xs cursor-pointer'>
                        <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>{openFilters ? 'HIDE' : 'SHOW'}</span>
                        <span onClick={clearFilters} className='hidden lg:block'>CLEAR</span>
                    </div>
                </div>
                <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
                        {RoomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedFilters.RoomTypes.includes(room)}
                                onChange={(checked) => handleFilterChange(checked, room, "RoomTypes")}
                            />
                        ))}
                    </div>
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={`${range}`}
                                selected={selectedFilters.priceRanges.includes(range)}
                                onChange={(checked) => handleFilterChange(checked, range, "priceRanges")}
                            />
                        ))}
                    </div>
                    <div className='px-5 pt-5 pb-7'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={selectedSort === option}
                                onChange={() => handleSortChange(option)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRooms;
