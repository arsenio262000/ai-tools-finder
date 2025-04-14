'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, User, Bookmark, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';

interface ProfileDropdownProps {
  userEmail: string;
  onSignOut: () => void;
}

const ProfileDropdown = ({ userEmail, onSignOut }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  // Fetch saved tools count
  const fetchSavedCount = async () => {
    try {
      const response = await fetch('/api/tools/saved');
      if (response.ok) {
        const data = await response.json();
        setSavedCount(data.tools?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching saved tools count:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedCount();
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsOpen(false); // Close dropdown
    openUserProfile(); // Open Clerk's user profile modal
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 text-gray-700 font-medium hover:text-emerald-600 transition-colors py-2 group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-emerald-700">
            {userEmail.charAt(0).toUpperCase()}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100/50 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Signed in as</p>
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
          </div>
          
          <div className="py-1">
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4" />
              Manage Account
            </button>
            <Link
              href="/saved-tools"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
            >
              <Bookmark className="w-4 h-4 group-hover:text-emerald-600 transition-colors" />
              <span className="group-hover:text-emerald-600 transition-colors">Saved Tools</span>
              {savedCount > 0 && (
                <span className="ml-auto bg-emerald-50 text-emerald-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </Link>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 