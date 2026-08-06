import { Router } from "express";
import { createExpense, editExpense } from "../controllers/expense.controller.js";

const router =Router()


router.post("/", createExpense)
router.patch("/:id", editExpense)

export default router;