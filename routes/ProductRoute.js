import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductBykategori
} from "../controllers/ProductController.js";


const router =  express.Router();

router.get("/products", getProducts);
router.get('/products/id/:id', getProductById);
router.get("/products/:kategori", getProductBykategori);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router;