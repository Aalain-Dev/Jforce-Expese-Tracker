import { useState, useEffect, useCallback } from "react";
import {
    getAllExpenses,
    createExpense,
    updateExpense,
} from "../services/expense.service.js";

/**
 * Hook to fetch all expenses for the current user.
 * Auto-fetches on mount. Exposes refetch() to reload manually.
 */
export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllExpenses();
            // Backend ApiResponse: { data: [...expenses], message: "..." }
            setExpenses(response.data || []);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load expenses.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return { expenses, loading, error, refetch: fetchExpenses };
};

/**
 * Hook to create a new expense.
 * Calls onSuccess() callback when the expense is created so the list can refresh.
 */
export const useCreateExpense = (onSuccess) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const addExpense = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            await createExpense(formData);
            if (onSuccess) onSuccess();
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to create expense.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addExpense, error, isLoading };
};

/**
 * Hook to update an existing expense.
 * Calls onSuccess() callback when the expense is updated so the list can refresh.
 */
export const useUpdateExpense = (onSuccess) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const editExpense = async (id, formData) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateExpense(id, formData);
            if (onSuccess) onSuccess();
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update expense.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { editExpense, error, isLoading };
};
