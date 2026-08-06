import prisma from "../config/db.js"
const createExpenseservice = async (expenseData) => {
    const data = await prisma.expenses.create({
        data: { 
            expense_name: expenseData.expense_name,
            amount: expenseData.expense_amount,
            expense_date: new Date(expenseData.expense_date),
            description: expenseData.description,
            user_id: "4f6c7e3a-92b1-4d8e-a7c5-23e6b4f9812a"
        }
    });
    return data;
};

const editExpenseservice = () => { }

export {
    createExpenseservice,
    editExpenseservice
}
