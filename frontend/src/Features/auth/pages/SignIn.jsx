import React from 'react';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mt-16 bg-white p-8 rounded-xl  shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl text-left  font-bold text-center text-gray-800">
        Login Page 
      </h2>

      <div>
        <label className="block text-md font-medium text-black-700 mb-2">
          Username
        </label>
        <input
          {...register('email', { required: 'Email required' })}
          placeholder="Enter your email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-md font-medium text-black-700 mb-2">
          Password
        </label>
        <input
          type="password"
          {...register('password', {
            required: 'Password required',
            minLength: 6,
          })}
          placeholder="Enter your password"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Logging in...' : 'Login In'}
      </button>
      <p className="text-center text-sm underline text-black-600 mt-4">
        New User? Register Here
      </p>
    </form>
    </div>
  );
};

export default SignIn;