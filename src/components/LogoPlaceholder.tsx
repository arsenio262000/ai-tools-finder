'use client';

import React from 'react';

interface LogoPlaceholderProps {
  name: string;
  className?: string;
}

// Color combinations for different tools
const colorSchemes = [
  { from: 'from-emerald-400', to: 'to-teal-500', text: 'text-white' },
  { from: 'from-blue-400', to: 'to-indigo-500', text: 'text-white' },
  { from: 'from-purple-400', to: 'to-pink-500', text: 'text-white' },
  { from: 'from-orange-400', to: 'to-red-500', text: 'text-white' },
  { from: 'from-cyan-400', to: 'to-blue-500', text: 'text-white' },
  { from: 'from-fuchsia-400', to: 'to-purple-500', text: 'text-white' },
];

export default function LogoPlaceholder({ name, className = '' }: LogoPlaceholderProps) {
  // Get initials from the name (up to 2 characters)
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Generate a consistent color scheme based on the name
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colorSchemes.length;
// Placeholder for potential future color scheme usage
const _colorScheme = colorSchemes[colorIndex];

  return (
    <div 
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg ${className}`}
    >
      <span className="text-lg font-semibold text-gray-600">
        {initials}
      </span>
    </div>
  );
} 