import React from 'react';
import { Link } from 'react-router-dom';
import { useSignIn } from './LogInHooks';

const LoginPage: React.FC = () => {
  const { handleSignIn, handleChange, submitDisabled, formValues, message } = useSignIn();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col sm:flex-row">
      <div className="hidden sm:flex sm:w-1/2 items-center justify-center bg-indigo-600 p-8">
        <div className="max-w-sm text-center">
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-indigo-100">Sign in to continue to Phon3y.</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <img src="/logo.png" alt="" className="h-8 w-8" />
            <span className="font-semibold">Phon3y</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Use your Phon3y account</p>
          <form onSubmit={handleSignIn} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {message && (
              <p className="text-sm text-red-600">{message}</p>
            )}
            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
