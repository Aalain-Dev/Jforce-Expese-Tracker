import { apiClient } from "../../apiBase.js";

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAllExpenses = async () => {
    const response = await apiClient.get("/expenses");
    return response.data;
};

export const createExpense = async ({ expense_name, expense_amount, expense_date, description }) => {
    const response = await apiClient.post("/expenses", {
        expense_name,
        expense_amount: parseFloat(expense_amount),
        expense_date,
        description,
    });
    return response.data;
};

export const updateExpense = async (id, { expense_name, expense_amount, expense_date, description }) => {
    const response = await apiClient.patch(`/expenses/${id}`, {
        expense_name,
        expense_amount: parseFloat(expense_amount),
        expense_date,
        description,
    });
    return response.data;
};
