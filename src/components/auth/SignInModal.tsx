'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import GoogleLogo from '@/components/icons/GoogleLogo';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
  onSignIn: (email: string) => void;
}

const SignInModal = ({ isOpen, onClose, onSignUpClick, onSignIn }: SignInModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add proper authentication logic here
    onSignIn(email);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    onSignIn('user@example.com');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome back">
      <div className="mt-2">
        <div className="flex flex-col gap-6">
          {/* Google Login Button */}
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-600 font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button 
                type="button" 
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Don&apos;t have an account?
            <button
              type="button"
              onClick={onSignUpClick}
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal; 