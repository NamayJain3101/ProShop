import express, { Router } from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../Controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

export default router