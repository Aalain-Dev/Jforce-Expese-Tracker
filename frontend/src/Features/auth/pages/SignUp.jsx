import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-5"
      >
        <h2 className="text-3xl text-left font-bold text-center text-gray-800">
         Registration 
        </h2>

        {/* Username */}
        <div>
          <label className="block text-md font-medium text-black-700 mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>
{/* Password */}
        <div>
          <label className="block text-md font-medium text-black-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
         {/* Email */}
        <div>
          <label className="block text-md font-medium text-black-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        {/* Full Name */}
        <div>
          <label className="block text-md font-medium text-black-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            {...register("fullName", {
              required: "Full name is required",
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

       

        

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;