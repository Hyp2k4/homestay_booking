import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const authData = req.auth?.();  // GỌI req.auth() để lấy dữ liệu auth

        if (!authData || !authData.userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(authData.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Protect Middleware Error:", error);
        return res.status(500).json({ success: false, message: "Authentication Error" });
    }
};
