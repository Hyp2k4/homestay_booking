import Homestay from "../models/Homestays.js";
import User from '../models/User.js';


export const registerHomestay = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id

        const homestay = await Homestay.findOne({ owner })
        if (homestay) {
            return res.json({ success: false, message: "Homestay Already Registered" })
        }

        await Homestay.create({ name, address, contact, city, owner })
        await User.findByIdAndUpdate(owner, { role: "homestayOwner" })

        res.json({ success: true, message: "Homestay Registered Successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

