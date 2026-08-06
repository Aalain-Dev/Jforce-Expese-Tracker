import { Router } from "express";
import { createExpense, editExpense, getallExpense } from "../controllers/expense.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router =Router()


router.post("/", protect, createExpense)
router.patch("/:id", protect, editExpense)
router.get("/", protect, getallExpense)

export default router;