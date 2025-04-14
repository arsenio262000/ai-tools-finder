'use client';

import { Tool } from '@/types';
import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { ToolCard } from './ToolCard';
import { ChevronLeft, ChevronRight, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolGridProps {
  tools: Tool[];
  view?: 'popular' | 'new';
  endpoint?: string;
}

const ITEMS_PER_PAGE = 96;

// Sponsored tool data
const sponsoredTools = [
  {
    id: 'notion-sponsored',
    name: 'Notion',
    description: 'All-in-one workspace for your notes, tasks, wikis, and databases.',
    logo: 'https://logo.clearbit.com/notion.so',
    isSponsored: true,
    categories: ['productivity', 'note-taking'],
    link: 'https://notion.so',
    cta: 'Try for Free'
  },
  {
    id: 'linear-sponsored',
    name: 'Linear',
    description: 'The issue tracking tool you will enjoy using.',
    logo: 'https://logo.clearbit.com/linear.app',
    isSponsored: true,
    categories: ['project-management', 'issue-tracking'],
    link: 'https://linear.app',
    cta: 'Start Now'
  },
  // Add more sponsored tools as needed
];

const SponsoredCard = ({ tool, index }: { tool: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative group"
  >
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 rounded-xl transform transition-transform duration-300 group-hover:scale-105" />
      <div className="relative bg-white rounded-xl border border-purple-100 p-6 shadow-lg shadow-purple-100/10 hover:shadow-purple-100/20 transition-all duration-300">
        {/* Sponsored Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-full border border-purple-100">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs font-medium text-purple-600">Sponsored</span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="relative w-16 h-16 rounded-xl border border-purple-100/50 overflow-hidden bg-white">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-full h-full object-contain p-2"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-purple-50/10" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{tool.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tool.description}</p>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.categories.map((category: string) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Visit Site Button */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg text-sm font-medium group-hover:from-purple-700 group-hover:to-fuchsia-700 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-100">
              Visit Site
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-purple-500/5 to-transparent rounded-br-xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-fuchsia-500/5 to-transparent rounded-bl-xl" />
        </div>
      </div>
    </a>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        {/* Logo Skeleton */}
        <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
        <div className="space-y-2">
          {/* Title Skeleton */}
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          {/* Tags Skeleton */}
          <div className="flex gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
      {/* Bookmark Button Skeleton */}
      <div className="w-8 h-8 bg-gray-200 rounded-xl animate-pulse" />
    </div>
    {/* Description Skeleton */}
    <div className="space-y-2">
      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
    </div>
    {/* Footer Skeleton */}
    <div className="flex items-center justify-between pt-2">
      <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

export function ToolGrid({ tools, view = 'popular', endpoint = '/api/tools/saved' }: ToolGridProps) {
  const { isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [savedToolsMap, setSavedToolsMap] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Insert sponsored cards every 8 regular tools
  const currentTools = [];
  const regularTools = tools.slice(startIndex, endIndex);
  
  regularTools.forEach((tool, index) => {
    currentTools.push(tool);
    // Add a sponsored tool after every 8 regular tools
    if ((index + 1) % 8 === 0) {
      const sponsoredIndex = Math.floor(index / 8) % sponsoredTools.length;
      const sponsoredTool = sponsoredTools[sponsoredIndex];
      currentTools.push({
        ...sponsoredTool,
        id: `${sponsoredTool.id}-${index}-${currentPage}`, // Make key unique with index and page
        isSponsored: true
      });
    }
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const fetchSavedTools = async () => {
    if (!isSignedIn) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/tools/saved/check');
      if (!response.ok) {
        throw new Error('Failed to fetch saved tools');
      }

      const data = await response.json();
      setSavedToolsMap(data.savedTools || {});
    } catch (error) {
      console.error('Error fetching saved tools:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (toolId: string) => {
    if (!isSignedIn) {
      // Open Clerk's SignIn modal instead of redirecting
      openSignIn();
      return;
    }

    try {
      const response = await fetch('/api/tools/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save tool');
      }

      // Update local state
      setSavedToolsMap(prev => ({
        ...prev,
        [toolId]: !prev[toolId]
      }));

      // Refetch saved tools to ensure sync
      await fetchSavedTools();
    } catch (error) {
      console.error('Error saving tool:', error);
    }
  };

  // Fetch saved tools on mount and when auth state changes
  useEffect(() => {
    if (isLoaded) {
      fetchSavedTools();
    }
  }, [isLoaded, isSignedIn]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTools.map((tool, index) => (
          tool.isSponsored ? (
            <SponsoredCard 
              key={tool.id} // Now using the unique ID we created above
              tool={tool} 
              index={index} 
            />
          ) : (
            <ToolCard
              key={tool.id}
              tool={tool}
              isSaved={savedToolsMap[tool.id] || false}
              onSave={() => handleSave(tool.id)}
            />
          )
        ))}
      </div>

      {/* Enhanced Pagination with better spacing */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(endIndex, tools.length)}</span> of{' '}
            <span className="font-medium">{tools.length}</span> tools
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolGrid; 