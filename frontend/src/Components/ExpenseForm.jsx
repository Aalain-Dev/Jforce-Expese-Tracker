import React from "react";
import { useForm } from "react-hook-form";

const ExpenseForm = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues || {
      expenseName: "",
      amount: "",
      date: "",
      description: "",
    },
  });

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {defaultValues ? "Update Expense" : "Add Expense"}
        </h2>

        {/* Expense Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expense Name
          </label>

          <input
            type="text"
            placeholder="Enter expense name"
            {...register("expenseName", {
              required: "Expense name is required",
            })}
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.expenseName ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.expenseName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.expenseName.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>

          <input
            type="date"
            {...register("date", {
              required: "Date is required",
            })}
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.date && (
            <p className="text-sm text-red-500 mt-1">
              {errors.date.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : defaultValues
            ? "Update Expense"
            : "Add Expense"}
        </button>
      </form>
  );
};

export default ExpenseForm;