import express, { Router } from 'express'
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from '../Controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems)
router.route('/myOrders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router