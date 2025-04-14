'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { softwareCategories, DropdownItem } from '@/data/navigation';
import { SignInButton, SignUpButton, useUser, useClerk } from "@clerk/nextjs";
import ProfileDropdown from './ProfileDropdown';

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #E5E7EB;
    border-radius: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #D1D5DB;
  }
`;

interface NavLogoProps {
  href: string;
}

const NavLogo = ({ href }: NavLogoProps) => (
  <Link href={href} className="flex items-center group">
    <div className="relative">
      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-2xl font-bold">AI</span>
      </div>
    </div>
    <span className="ml-4 text-gray-800 font-semibold text-xl">Find Next AI</span>
  </Link>
);

interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownItem[];
}

const DropdownMenu = ({ isOpen, items }: DropdownMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 w-[600px] mt-2 p-4 bg-white rounded-xl shadow-xl border border-gray-100/50 backdrop-blur-sm z-[70] transform origin-top transition-all duration-200 ease-out">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50/80 transition-all duration-200 border border-transparent hover:border-gray-100"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-200">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                {item.description}
              </p>
            </div>
            <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  items: DropdownItem[];
}

const MobileMenu = ({ isOpen, isDropdownOpen, setIsDropdownOpen, items }: MobileMenuProps) => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200 bg-white">
      <div className="px-4 pt-4 pb-6 space-y-4">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full text-gray-700 hover:bg-gray-50 px-5 py-4 text-lg font-medium rounded-lg transition-colors"
          >
            <span>Best Software</span>
            <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="mt-2 space-y-2 px-2">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/submit-tool"
          className="flex items-center text-gray-700 hover:bg-gray-50 px-5 py-4 text-lg font-medium rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Submit Your Tool
        </Link>

        {!isSignedIn ? (
          <div className="space-y-2">
            <SignInButton mode="modal">
              <button className="w-full text-left text-gray-700 hover:bg-gray-50 px-5 py-4 text-lg font-medium rounded-lg transition-colors">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="w-full text-left bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-4 text-lg font-medium rounded-lg transition-colors">
                Sign up
              </button>
            </SignUpButton>
          </div>
        ) : (
          <div className="px-5">
            <ProfileDropdown
              userEmail={user?.primaryEmailAddress?.emailAddress || ''}
              onSignOut={handleSignOut}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <style jsx global>{customScrollbarStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLogo href="/" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {/* Software Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 px-5 py-2.5 text-base font-medium transition-colors"
              >
                Best Software
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <DropdownMenu isOpen={isDropdownOpen} items={softwareCategories} />
            </div>

            {/* Submit Tool Link */}
            <Link
              href="/submit-tool"
              className="flex items-center text-gray-600 hover:text-emerald-600 px-5 py-2.5 text-base font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Submit Your Tool
            </Link>

            {/* Authentication */}
            <div className="flex items-center gap-4">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="text-gray-600 hover:text-emerald-600 px-5 py-2.5 text-base font-medium transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-emerald-700 transition-colors">
                      Sign up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <ProfileDropdown
                  userEmail={user?.primaryEmailAddress?.emailAddress || ''}
                  onSignOut={handleSignOut}
                />
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isOpen}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        items={softwareCategories}
      />
    </nav>
  );
};

export default Navbar; 