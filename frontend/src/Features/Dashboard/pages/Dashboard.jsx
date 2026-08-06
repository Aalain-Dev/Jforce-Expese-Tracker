import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Expense Tracker
        </h1>

        <p className="text-gray-600 mb-8">
          Track and manage your expenses efficiently. Add new expenses,
          monitor your spending, and keep your financial records organized in
          one place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard/expense")}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Add Expense
          </button>

          <button
            onClick={() => navigate("/dashboard/expenselist")}
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Expense List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;