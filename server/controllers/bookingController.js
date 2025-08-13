import transporter from "../config/nodemailer.js";
import Booking from "../models/Booking.js";
import Homestay from "../models/Hotels.js";
import Room from "../models/Room.js";
import formatCurrency from "../formatCurrency.js";
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
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You must be logged in to make a booking" });
        }
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

        const mailOptions = {
            from: 'hiephoang1752004@gmail.com',
            to: req.user.email,
            subject: "✨ Your Homestay Booking Confirmation",
            html: `
    <div style="font-family: Arial, sans-serif; background: linear-gradient(to bottom, #f9fafb, #e0f2fe); padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #d1d5db;">
      
      <!-- Animated Banner -->
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif" alt="Booking Confirmed" style="width: 80px; margin-bottom: 10px;" />
        <h2 style="color: #2563eb; margin-bottom: 5px;">Booking Confirmed!</h2>
        <p style="color: #4b5563; font-size: 14px;">Hello <strong>${req.user.username}</strong>, we’re excited to host you!</p>
      </div>

      <!-- Details Card -->
      <div style="background: white; padding: 15px 20px; border-radius: 8px; margin-top: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
        <h3 style="color: #111827; margin-top: 0;">📅 Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Booking ID:</strong></td>
            <td style="padding: 6px 0;">${booking._id}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Homestay Name:</strong></td>
            <td style="padding: 6px 0;">${roomData.homestay?.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Address:</strong></td>
            <td style="padding: 6px 0;">${roomData.homestay?.address}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Check-In:</strong></td>
            <td style="padding: 6px 0;">${booking.checkInDate.toDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Check-Out:</strong></td>
            <td style="padding: 6px 0;">${booking.checkOutDate.toDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Guests:</strong></td>
            <td style="padding: 6px 0;">${booking.guests}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;"><strong>Total Price:</strong></td>
            <td style="padding: 6px 0; color: #16a34a; font-weight: bold;">${formatCurrency(booking.totalPrice)} VND</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="text-align: center; font-size: 13px; color: #6b7280; margin-top: 20px;">
        <p>We look forward to hosting you 🏡</p>
        <p style="margin: 0;">— The Meap Homestay Team</p>
      </div>

    </div>
  `
        };

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Booking created successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Failed to create booking" })
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
        const homestay = await Homestay.findOne({ owner: req.auth().userId })
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