import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    owner: { type: String, required: true, ref: 'User' },
    city: { type: String, required: true }
}, { timestamps: true })


const Homestay = mongoose.model("Homestay", homestaySchema)

export default Homestay;