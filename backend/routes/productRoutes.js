import express, { Router } from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../Controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router