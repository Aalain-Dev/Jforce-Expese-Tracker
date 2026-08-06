import React, { useState } from "react";
import Modal from "../../../Components/Modal";
import ExpenseForm from "../../../Components/ExpenseForm";

const ExpenseList = () => {
    const expenses = [
        {
            id: 1,
            expenseName: "Food",
            amount: 500,
            date: "2026-08-01",
            description: "Dinner with friends",
        },
        {
            id: 2,
            expenseName: "Travel",
            amount: 1200,
            date: "2026-08-03",
            description: "Cab expenses",
        },
        {
            id: 3,
            expenseName: "Shopping",
            amount: 2500,
            date: "2026-08-05",
            description: "Clothes purchase",
        },
    ];

    const [modal, setmodal] = useState(false)
    console.log(modal)
    return (
        <div className=" bg-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Expense List
                    </h1>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                        onClick={
                            () => { setmodal(true) }
                        }
                    >
                        Add Expense
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 border-b">Expense Name</th>
                                <th className="px-4 py-3 border-b">Amount</th>
                                <th className="px-4 py-3 border-b">Date</th>
                                <th className="px-4 py-3 border-b">Description</th>
                                <th className="px-4 py-3 border-b">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {expenses.map((expense) => (
                                <tr
                                    key={expense.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 border-b font-medium text-gray-800">
                                        {expense.expenseName}
                                    </td>

                                    <td className="px-4 py-3 border-b text-gray-700">
                                        ₹{expense.amount}
                                    </td>

                                    <td className="px-4 py-3 border-b text-gray-700">
                                        {expense.date}
                                    </td>

                                    <td className="px-4 py-3 border-b text-gray-700">
                                        {expense.description}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        <div className="flex gap-2">
                                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"

                                                onClick={
                                                    () => { setmodal(true) }
                                                }
                                            >
                                                Edit
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {expenses.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No expenses found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={modal} onClose={() => setmodal(false)}>
                <ExpenseForm onSubmit={(data) => console.log(data)} />
            </Modal>
        </div >
    );
};

export default ExpenseList;