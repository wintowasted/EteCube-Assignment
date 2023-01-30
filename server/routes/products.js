import express from "express"
import {createProduct, deleteProduct, getAllProducts, updateProduct, createMockData} from "../controllers/productsController.js"
const router = express.Router()

router.route("/")
    .get(getAllProducts)
    .post(createProduct)

router.route("/:id")
    .patch(updateProduct)
    .delete(deleteProduct)

router.route("/mock")
    .post(createMockData)

export default router