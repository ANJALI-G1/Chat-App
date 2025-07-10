import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

// Logging each route definition
console.log('Defining route: GET /api/messages/users-list');
router.get("/users-list", protectRoute, getUsersForSidebar);

console.log('Defining route: GET /api/messages/:id');
router.get("/:id", protectRoute, getMessages);

console.log('Defining route: POST /api/messages/send/:id');
router.post("/send/:id", protectRoute, sendMessage);

export default router;