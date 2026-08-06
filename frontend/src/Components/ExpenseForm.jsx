import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

/**
 * Reusable expense form for both Add and Edit.
 *
 * Props:
 *  - defaultValues: pre-fill fields when editing (optional)
 *  - onSubmit(formData): called with validated form data
 *  - isLoading: show spinner on the submit button
 *  - serverError: display an error from the server
 *  - onCancel: optional cancel callback (e.g. to close modal)
 */
const ExpenseForm = ({ defaultValues, onSubmit, isLoading, serverError, onCancel }) => {
    const isEditing = Boolean(defaultValues);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues || {
            expense_name: "",
            expense_amount: "",
            expense_date: "",
            description: "",
        },
    });

    // Reset form if defaultValues change (switching between edit targets)
    useEffect(() => {
        reset(
            defaultValues || {
                expense_name: "",
                expense_amount: "",
                expense_date: "",
                description: "",
            }
        );
    }, [defaultValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white rounded-xl p-8 space-y-5"
        >
            <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Update Expense" : "Add Expense"}
            </h2>

            {/* Server error */}
            {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
                    {serverError}
                </div>
            )}

            {/* Expense Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expense Name
                </label>
                <input
                    id="expense-name"
                    type="text"
                    placeholder="e.g. Groceries, Rent, Travel"
                    {...register("expense_name", {
                        required: "Expense name is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.expense_name ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.expense_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.expense_name.message}</p>
                )}
            </div>

            {/* Amount */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                </label>
                <input
                    id="expense-amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("expense_amount", {
                        required: "Amount is required",
                        min: { value: 0.01, message: "Amount must be greater than 0" },
                    })}
                    className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.expense_amount ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.expense_amount && (
                    <p className="text-sm text-red-500 mt-1">{errors.expense_amount.message}</p>
                )}
            </div>

            {/* Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                </label>
                <input
                    id="expense-date"
                    type="date"
                    {...register("expense_date", {
                        required: "Date is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        errors.expense_date ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.expense_date && (
                    <p className="text-sm text-red-500 mt-1">{errors.expense_date.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </label>
                <textarea
                    id="expense-description"
                    rows="3"
                    placeholder="What was this expense for?"
                    {...register("description")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                )}
                <button
                    id="expense-submit"
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading
                        ? "Saving..."
                        : isEditing
                        ? "Update Expense"
                        : "Add Expense"}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;