'use client';

import { useUser } from "@clerk/nextjs";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Tool } from '@/types';
import { ToolCard } from '@/components/ToolCard';

const SkeletonLoader = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border p-6 space-y-4"
          >
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
        ))}
      </div>
    </div>
  </div>
);

export default function SavedToolsPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [savedTools, setSavedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSavedTools = async () => {
    if (!isSignedIn) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/tools/saved');
      if (!response.ok) {
        throw new Error('Failed to fetch saved tools');
      }

      const data = await response.json();
      console.log('Fetched saved tools:', data); // Debug log
      setSavedTools(data.tools || []);
    } catch (err) {
      console.error('Error fetching saved tools:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch saved tools'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (toolId: string) => {
    try {
      const response = await fetch('/api/tools/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save tool');
      }

      // Remove the tool from local state immediately for better UX
      setSavedTools(prev => prev.filter(tool => tool.id !== toolId));
    } catch (error) {
      console.error('Error saving tool:', error);
      // Refetch in case of error to ensure consistency
      await fetchSavedTools();
    }
  };

  // Fetch saved tools on mount and when auth state changes
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      fetchSavedTools();
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded || isLoading) {
    return <SkeletonLoader />;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please sign in to view your saved tools</h1>
          <p className="text-gray-600">You need to be signed in to access your saved tools.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error loading saved tools</h1>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Saved Tools</h1>
            <p className="text-gray-600">Manage your collection of saved tools</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BookmarkIcon className="h-5 w-5" />
            <span className="font-medium">{savedTools.length} tools saved</span>
          </div>
        </div>

        {savedTools.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <BookmarkIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved tools yet</h2>
            <p className="text-gray-600 mb-6">Start saving tools by clicking the bookmark icon on any tool card</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Explore Tools
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isSaved={true}
                onSave={() => handleSave(tool.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 