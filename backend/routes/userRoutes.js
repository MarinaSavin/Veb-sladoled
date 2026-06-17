import express from "express";
import {
    authUser, registerUser, logoutUser,
    getFavoriteProducts, addFavoriteProduct, removeFavoriteProduct
} from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/favorites").get(protect, getFavoriteProducts);
router.route("/favorites/:productId").post(protect, addFavoriteProduct).delete(protect, removeFavoriteProduct);

export default router;
