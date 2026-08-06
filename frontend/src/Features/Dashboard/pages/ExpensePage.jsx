import React from 'react';
import ExpenseForm from '../../../Components/ExpenseForm';
import { useCreateExpense } from '../hooks/expense.hooks.js';
import { useNavigate } from 'react-router-dom';

const ExpensePage = () => {
    const navigate = useNavigate();

    const { addExpense, error, isLoading } = useCreateExpense(() => {
        navigate('/dashboard/expenselist');
    });

    const onSubmit = (data) => {
        addExpense(data);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
            <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
                Fill in the details below and click <strong>Add Expense</strong> to save your expense.
            </p>
            <div className="w-full max-w-lg shadow-lg rounded-xl">
                <ExpenseForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    serverError={error}
                    onCancel={() => navigate('/dashboard/expenselist')}
                />
            </div>
        </div>
    );
};

export default ExpensePage;
