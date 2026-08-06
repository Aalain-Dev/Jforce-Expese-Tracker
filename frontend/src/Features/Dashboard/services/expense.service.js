import { apiClient } from "../../apiBase.js";

/**
 * Attach the JWT token to every request automatically.
 * Reads the token from localStorage on each request.
 */
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Get all expenses for the logged-in user.
 * GET /api/v1/expenses
 */
export const getAllExpenses = async () => {
    const response = await apiClient.get("/expenses");
    return response.data; // { data: [...], message: "..." }
};

/**
 * Create a new expense.
 * POST /api/v1/expenses
 * Body: { expense_name, expense_amount, expense_date, description }
 */
export const createExpense = async ({ expense_name, expense_amount, expense_date, description }) => {
    const response = await apiClient.post("/expenses", {
        expense_name,
        expense_amount: parseFloat(expense_amount),
        expense_date,
        description,
    });
    return response.data;
};

/**
 * Update an existing expense by ID.
 * PATCH /api/v1/expenses/:id
 * Body: { expense_name, expense_amount, expense_date, description }
 */
export const updateExpense = async (id, { expense_name, expense_amount, expense_date, description }) => {
    const response = await apiClient.patch(`/expenses/${id}`, {
        expense_name,
        expense_amount: parseFloat(expense_amount),
        expense_date,
        description,
    });
    return response.data;
};
