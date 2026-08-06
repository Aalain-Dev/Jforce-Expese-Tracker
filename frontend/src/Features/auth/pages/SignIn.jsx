import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/auth.hooks.js';

const SignIn = ({ onSwitchToSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login, error, isLoading } = useLogin();

  const onSubmit = async (data) => {
    await login({ email: data.email, password: data.password });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mt-16 bg-white p-8 rounded-xl shadow-lg space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl text-left font-bold text-center text-gray-800">
          Login
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="signin-email"
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
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
            id="signin-password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          id="signin-submit"
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          New user?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignIn;