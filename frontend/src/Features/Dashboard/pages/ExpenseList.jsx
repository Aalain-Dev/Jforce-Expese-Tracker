import React, { useState } from "react";
import Modal from "../../../Components/Modal";
import ExpenseForm from "../../../Components/ExpenseForm";
import { useExpenses, useCreateExpense, useUpdateExpense } from "../hooks/expense.hooks.js";
import { useNavigate } from "react-router-dom";

const ExpenseList = () => {
    const navigate = useNavigate();

    const { expenses, loading, error, refetch } = useExpenses();

    const [modalMode, setModalMode] = useState(null);
    const selectedExpense = typeof modalMode === "object" && modalMode !== null ? modalMode : null;

    const { addExpense, error: createError, isLoading: createLoading } = useCreateExpense(() => {
        setModalMode(null);
        refetch();
    });

    const { editExpense, error: updateError, isLoading: updateLoading } = useUpdateExpense(() => {
        setModalMode(null);
        refetch();
    });

    const handleFormSubmit = (data) => {
        if (selectedExpense) {
            editExpense(selectedExpense.id, data);
        } else {
            addExpense(data);
        }
    };

    const editDefaults = selectedExpense
        ? {
              expense_name: selectedExpense.expense_name,
              expense_amount: String(selectedExpense.amount),
              expense_date: selectedExpense.expense_date
                  ? new Date(selectedExpense.expense_date).toISOString().split("T")[0]
                  : "",
              description: selectedExpense.description || "",
          }
        : null;

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const totalAmount = expenses.reduce(
        (sum, e) => sum + parseFloat(e.amount || 0),
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Expense List</h1>
                        {!loading && expenses.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                                {expenses.length} expense{expenses.length !== 1 ? "s" : ""} · Total: ₹{totalAmount.toFixed(2)}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/dashboard/home")}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
                        >
                            ← Back
                        </button>
                        <button
                            id="open-add-modal"
                            onClick={() => setModalMode("add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium"
                        >
                            + Add Expense
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                        {error}
                        <button
                            onClick={refetch}
                            className="ml-3 underline hover:no-underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Loading expenses...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                                        <th className="px-5 py-3 border-b font-semibold">#</th>
                                        <th className="px-5 py-3 border-b font-semibold">Name</th>
                                        <th className="px-5 py-3 border-b font-semibold">Amount</th>
                                        <th className="px-5 py-3 border-b font-semibold">Date</th>
                                        <th className="px-5 py-3 border-b font-semibold">Description</th>
                                        <th className="px-5 py-3 border-b font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-16 text-gray-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-4xl">📭</span>
                                                    <p className="text-base font-medium">No expenses yet</p>
                                                    <button
                                                        onClick={() => setModalMode("add")}
                                                        className="mt-2 text-blue-600 underline text-sm hover:no-underline"
                                                    >
                                                        Add your first expense
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        expenses.map((expense, index) => (
                                            <tr
                                                key={expense.id}
                                                className="hover:bg-gray-50 transition border-b last:border-0"
                                            >
                                                <td className="px-5 py-4 text-gray-400 text-sm">
                                                    {index + 1}
                                                </td>
                                                <td className="px-5 py-4 font-medium text-gray-800">
                                                    {expense.expense_name}
                                                </td>
                                                <td className="px-5 py-4 text-green-700 font-semibold">
                                                    ₹{parseFloat(expense.amount).toFixed(2)}
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 text-sm">
                                                    {formatDate(expense.expense_date)}
                                                </td>
                                                <td className="px-5 py-4 text-gray-500 text-sm max-w-xs truncate">
                                                    {expense.description || <span className="italic text-gray-300">—</span>}
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        onClick={() => setModalMode(expense)}
                                                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={modalMode !== null} onClose={() => setModalMode(null)}>
                <ExpenseForm
                    defaultValues={editDefaults}
                    onSubmit={handleFormSubmit}
                    isLoading={createLoading || updateLoading}
                    serverError={createError || updateError}
                    onCancel={() => setModalMode(null)}
                />
            </Modal>
        </div>
    );
};

export default ExpenseList;