import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/auth.hooks.js";

const SignUp = ({ onSwitchToSignIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signup, error, isLoading, success } = useRegister();

  const onSubmit = async (data) => {
    await signup({
      username: data.username,
      email: data.email,
      password: data.password,
      full_name: data.full_name,
    });
  };

  return (
    <div className=" min-h-screen  flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-5"
      >
        <h2 className="text-3xl text-left font-bold text-center text-gray-800">
          Registration
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2 rounded-lg">
            Account created successfully! Redirecting to login...
          </div>
        )}

        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="signup-fullname"
            type="text"
            placeholder="Enter full name"
            {...register("full_name", {
              required: "Full name is required",
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.full_name ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            id="signup-username"
            type="text"
            placeholder="Enter username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          id="signup-submit"
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading || isSubmitting ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-green-600 underline hover:text-green-800"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;