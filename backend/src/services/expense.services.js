import prisma from "../config/db.js"
const createExpenseservice = async (expenseData, id) => {
    const data = await prisma.expenses.create({
        data: {
            expense_name: expenseData.expense_name,
            amount: expenseData.expense_amount,
            expense_date: new Date(expenseData.expense_date),
            description: expenseData.description,
            user_id: id
        }
    });
    return data;
};

const editExpenseservice = async (taskid, data) => {
    const update = await prisma.expenses.update({
        where: {
            id: taskid
        },
        data: {
            expense_name: data.expense_name,
            amount: data.expense_amount,
            expense_date: new Date(data.expense_date),
            description: data.description
        }
    });
    return update;
}
const getAllExpenseservice = (id) => {
    const getall = prisma.expenses.findMany({
        where: {
            user_id: id
        }
    });
    return getall;
}
export {
    createExpenseservice,
    editExpenseservice,
    getAllExpenseservice
}
