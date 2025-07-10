import express from 'express'
import { checkAuth, login, logout, signup, updateProfilePic } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Logging each route definition
console.log('Defining route: POST /api/auth/signup');
router.post("/signup", signup);

console.log('Defining route: POST /api/auth/login');
router.post("/login", login);

console.log('Defining route: POST /api/auth/logout');
router.post("/logout", logout);

console.log('Defining route: PUT /api/auth/update-profile');
router.put("/update-profile", protectRoute, updateProfilePic);

console.log('Defining route: GET /api/auth/check');
router.get("/check", protectRoute, checkAuth);

export default router;