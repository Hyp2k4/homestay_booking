import { v2 as cloudinary } from "cloudinary"
import Room from "../models/Room.js"
import Homestay from "../models/Hotels.js"

export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities, description } = req.body
        const homestay = await Homestay.findOne({ owner: req.auth().userId })

        if (!homestay) return res.json({ success: false, message: "No Homestay found" })

        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path)
            return response.secure_url;
        })

        const images = await Promise.all(uploadImages)


        await Room.create({
            homestay: homestay._id,
            roomType,
            description,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        res.json({ success: true, message: "Room created successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'homestay',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 })
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const getOwnerRooms = async (req, res) => {
    try {
        const homestayData = await Homestay.findOne({ owner: req.auth().userId })
        const rooms = await Room.find({ homestay: homestayData._id.toString() }).populate("homestay")
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable
        await roomData.save();
        res.json({ success: true, message: "Room Availability Updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}