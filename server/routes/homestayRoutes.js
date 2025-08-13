import express from "express";
import { protect } from "../middleware/authMiddleware.js"
import { registerHomestay } from "../controllers/homestayController.js"
const homestayRouter = express.Router();

homestayRouter.post("/", protect, registerHomestay)

export default homestayRouter