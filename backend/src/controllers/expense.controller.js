import { createExpenseservice, editExpenseservice } from "../services/expense.services.js"
import asyncHandler from "../utils/asynchandler.js"

const createExpense = asyncHandler(async (req, res) => {
    console.log(req.body)
    const createexp = await createExpenseservice(req.body)
    if (createexp) {
        console.log("Accepted")
    }
    return createexp
})

const editExpense = asyncHandler(async (req, res) => {
    const editedexp = await editExpenseservice(req.params.id, req.body)
})
export {
    createExpense,
    editExpense
}