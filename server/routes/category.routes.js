import express from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

// Admin Specific Routes
router.post("/", userAuth, createCategory);
router.put("/:id", userAuth, updateCategory);
router.delete("/:id", userAuth, deleteCategory);

// Logged in user Routes
router.get("/", userAuth, getAllCategories);
router.get("/:id", userAuth, getCategoryById);

export default router;
