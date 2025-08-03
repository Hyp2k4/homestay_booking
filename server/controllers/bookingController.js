import Booking from "../models/Booking.js";
import Homestay from "../models/Hotels.js";
import Room from "../models/Room.js";
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        })
        const isAvailable = bookings.length === 0
        return isAvailable
    } catch (error) {
        console.error(error.message)
    }
}

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room })
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body
        const user = req.user._id

        const isAvailable = await checkAvailability({
            checkInDate, checkOutDate, room
        })
        if (!isAvailable) {
            res.json({ success: false, message: "Room is not available" })
        }
        const roomData = await Room.findById(room).populate("homestay")
        let totalPrice = roomData.pricePerNight


        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
        totalPrice *= nights

        const booking = await Booking.create({
            user,
            room,
            homestay: roomData.homestay._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })

        res.json({ success: true, message: "Booking created successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: true, bookings })
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id
        const bookings = await Booking.find({ user }).populate("room homestay").sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" })
    }
}

export const getHomestayBookings = async (req, res) => {
    try {
        const homestay = await Homestay.findOne({ owner: req.auth.userId })
        if (!homestay) {
            return res.json({ success: false, message: "No Homestay found" })
        }
        const bookings = await Booking.find({ homestay: homestay._id }).populate("room homestay user").sort({ createdAt: -1 })
        const totalBookings = bookings.length
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" })
    }
}