import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Thành phố Hà Nội",
    "Thành phố Hồ Chí Minh",
    "Thành phố Huế",
    "Thành phố Đà Nẵng",
    "Thành phố Cần Thơ",
    "Thành phố Hải Phòng",
    "Tỉnh Lai Châu",
    "Tỉnh Điện Biên",
    "Tỉnh Sơn La",
    "Tỉnh Lạng Sơn",
    "Tỉnh Cao Bằng",
    "Tỉnh Tuyên Quang",
    "Tỉnh Lào Cai",
    "Tỉnh Thái Nguyên",
    "Tỉnh Phú Thọ",
    "Tỉnh Bắc Ninh",
    "Tỉnh Hưng Yên",
    "Tỉnh Ninh Bình",
    "Tỉnh Quảng Ninh",
    "Tỉnh Thanh Hóa",
    "Tỉnh Nghệ An",
    "Tỉnh Hà Tĩnh",
    "Tỉnh Quảng Trị",
    "Tỉnh Quảng Ngãi",
    "Tỉnh Gia Lai",
    "Tỉnh Khánh Hòa",
    "Tỉnh Lâm Đồng",
    "Tỉnh Đắk Lắk",
    "Tỉnh Đồng Nai",
    "Tỉnh Tây Ninh",
    "Tỉnh Vĩnh Long",
    "Tỉnh Đồng Tháp",
    "Tỉnh Cà Mau",
    "Tỉnh An Giang"
];


// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides." },
    { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "QuickStay exceeded my expectations. The booking process was seamless, and the hotels were absolutely top-notch. Highly recommended!" },
    { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Amazing service! I always find the best luxury accommodations through QuickStay. Their recommendations never disappoint!" }
];

// Facility Icon
export const facilityIcons = {
    "free wifi": assets.freeWifiIcon,
    "free breakfast": assets.freeBreakfastIcon,
    "room service": assets.roomServiceIcon,
    "mountain view": assets.mountainIcon,
    "pool access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "homestayOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Urbanza Suites",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "67f76500197ac559e4089ba0",
        "hotel": hotelDummyData,
        "roomType": "Suite",
        "pricePerNight": 499,
        "amenities": ["Balcony", "Free Breakfast", "Hot Tub"],
        "images": [roomImg1, roomImg3, roomImg2, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:20:00.000Z",
        "updatedAt": "2025-04-11T08:20:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f76513197ac559e4089ba1",
        "hotel": hotelDummyData,
        "roomType": "Queen Bed",
        "pricePerNight": 319,
        "amenities": ["Free WiFi", "City View", "Private Bathroom"],
        "images": [roomImg2, roomImg1, roomImg4, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:21:00.000Z",
        "updatedAt": "2025-04-11T08:21:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f76525197ac559e4089ba2",
        "hotel": hotelDummyData,
        "roomType": "Twin Room",
        "pricePerNight": 279,
        "amenities": ["Room Service", "TV", "Mini Bar"],
        "images": [roomImg3, roomImg1, roomImg2, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:22:00.000Z",
        "updatedAt": "2025-04-11T08:22:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f76532197ac559e4089ba3",
        "hotel": hotelDummyData,
        "roomType": "King Suite",
        "pricePerNight": 599,
        "amenities": ["Jacuzzi", "Balcony", "Smart TV"],
        "images": [roomImg4, roomImg3, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:23:00.000Z",
        "updatedAt": "2025-04-11T08:23:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f76545197ac559e4089ba4",
        "hotel": hotelDummyData,
        "roomType": "Single Bed",
        "pricePerNight": 189,
        "amenities": ["Free WiFi", "Fan", "Shared Bathroom"],
        "images": [roomImg2, roomImg3, roomImg1, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:24:00.000Z",
        "updatedAt": "2025-04-11T08:24:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f76558197ac559e4089ba5",
        "hotel": hotelDummyData,
        "roomType": "Deluxe Twin",
        "pricePerNight": 359,
        "amenities": ["Air Conditioning", "Free Breakfast", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:25:00.000Z",
        "updatedAt": "2025-04-11T08:25:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f7656b197ac559e4089ba6",
        "hotel": hotelDummyData,
        "roomType": "Family Room",
        "pricePerNight": 429,
        "amenities": ["Kitchenette", "Multiple Beds", "Smart TV"],
        "images": [roomImg3, roomImg4, roomImg2, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:26:00.000Z",
        "updatedAt": "2025-04-11T08:26:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f7657f197ac559e4089ba7",
        "hotel": hotelDummyData,
        "roomType": "Standard Room",
        "pricePerNight": 229,
        "amenities": ["Free WiFi", "Desk", "Room Service"],
        "images": [roomImg4, roomImg1, roomImg3, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:27:00.000Z",
        "updatedAt": "2025-04-11T08:27:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f76591197ac559e4089ba8",
        "hotel": hotelDummyData,
        "roomType": "Luxury Suite",
        "pricePerNight": 649,
        "amenities": ["Private Pool", "Ocean View", "24/7 Butler"],
        "images": [roomImg2, roomImg4, roomImg1, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:28:00.000Z",
        "updatedAt": "2025-04-11T08:28:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f765a4197ac559e4089ba9",
        "hotel": hotelDummyData,
        "roomType": "Penthouse",
        "pricePerNight": 899,
        "amenities": ["Rooftop Access", "Private Elevator", "Bar"],
        "images": [roomImg1, roomImg4, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-11T08:29:00.000Z",
        "updatedAt": "2025-04-11T08:29:00.000Z",
        "__v": 0
    },
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 399,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 299,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 249,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelDummyData,
        "roomType": "Single Bed",
        "pricePerNight": 199,
        "amenities": ["Free WiFi", "Room Service", "Pool Access"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    }
]



// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/