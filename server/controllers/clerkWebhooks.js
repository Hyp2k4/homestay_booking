import e from "express";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        //Getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };
        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }
        switch (type) {
            case "user.created":
                // Create a new user
                await User.create(userData);
                console.log("New user created:", newUser);
                break;
            case "user.updated":
                // Update existing user
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                // Delete user
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }
        res.json({ success: true, message: "Webhook Received and Processed Successfully" });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: "Webhook Processing Failed", error: error.message });
    }
}

export default clerkWebhooks;