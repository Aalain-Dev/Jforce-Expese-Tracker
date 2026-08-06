import { createExpenseservice, editExpenseservice, getAllExpenseservice } from "../services/expense.services.js"
import asyncHandler from "../utils/asynchandler.js"
import ApiResponse from "../utils/apierror.js"
const createExpense = asyncHandler(async (req, res) => {
    const id = req.user.id
    const createexp = await createExpenseservice(req.body, id)
    return res
        .status(201)
        .json(new ApiResponse(createexp, "Expense created successfully."));
})

const editExpense = asyncHandler(async (req, res) => {
    const taskid = req.params.id
    const editedexp = await editExpenseservice(taskid, req.body)
     return res
        .status(200)
        .json(new ApiResponse(editedexp, "Expense updated successfully."));
})

const getallExpense = asyncHandler(async (req, res) => {
    const id = req.user.id
    const getall = await getAllExpenseservice(id)
    return res
        .status(200)
        .json(new ApiResponse(getall, "Expenses retrieved successfully."));
})

export {
    createExpense,
    editExpense,
    getallExpense
}