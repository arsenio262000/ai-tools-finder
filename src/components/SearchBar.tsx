'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Tool } from '@/types';
import { tools } from '@/data/processed-tools';
import { Portal } from '@/components/Portal';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    
    if (!searchQuery.trim()) {
      setSuggestions([]);
      onSearch('');
      setLoading(false);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filteredTools = tools
      .filter(tool => {
        const searchableText = [
          tool.name,
          tool.description,
          ...tool.categories,
        ].join(' ').toLowerCase();

        return searchTerms.every(term => searchableText.includes(term));
      })
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filteredTools);
    onSearch(searchQuery);
    setLoading(false);
  }, [onSearch]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full max-w-2xl mx-auto flex items-center gap-2 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-400 hover:border-emerald-200 hover:text-emerald-600 transition-all duration-300 group"
      >
        <Search className="w-5 h-5 group-hover:text-emerald-600" />
        <span className="flex-grow text-left">Search for any tool or feature...</span>
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-100/50 rounded text-xs text-gray-400">
          <span className="text-xs">⌘</span>
          <span>K</span>
        </div>
      </button>

      {/* Search Popup */}
      {isOpen && (
        <Portal>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] transition-opacity duration-200" 
            onClick={() => setIsOpen(false)} 
          />
          <div 
            ref={modalRef}
            className="fixed left-1/2 top-[20vh] -translate-x-1/2 w-full max-w-2xl z-[999] bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
          >
            {/* Search input */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      handleSearch('');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : suggestions.length > 0 ? (
                <div className="space-y-0.5">
                  {suggestions.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        window.location.href = `/tools/${tool.id}`;
                        setIsOpen(false);
                      }}
                      className="flex items-start w-full gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={tool.logo}
                          alt={tool.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <h3 className="font-medium text-gray-900 truncate">{tool.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{tool.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {query ? 'No results found' : 'Start searching'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {query ? 'Try different keywords or browse categories' : 'Type to search for AI tools'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
} 