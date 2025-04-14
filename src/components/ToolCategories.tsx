'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllCategories, getToolsByCategory } from '@/utils/toolsData';

interface Category {
  title: string;
  description: string;
  href: string;
}

// Helper function to get tools count by category
const getToolsCountByCategory = (category: string): number => {
  return getToolsByCategory(category).length;
};

// Generate category descriptions
const generateCategoryDescription = (category: string): string => {
  const count = getToolsCountByCategory(category);
  return `Discover ${count} of the best ${category.toLowerCase()} tools for your workflow.`;
};

export const ToolCategories = () => {
  const [isClient, setIsClient] = useState(false);
  const categories: Category[] = getAllCategories().map((cat) => ({
    title: `Best ${cat} Tools`,
    description: generateCategoryDescription(cat),
    href: `/lists/${cat.toLowerCase().replace(/\s+/g, '-')}`
  }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white pointer-events-none" />
      
      {/* Decorative blobs */}
      {isClient && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-100/30 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-b from-blue-100/20 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-b from-purple-100/20 to-transparent rounded-full blur-3xl -z-10" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border border-emerald-100 inline-block mb-4 shadow-sm">
            Find Your Perfect Tool
          </span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-800">
            Explore Tools by Category
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Browse our curated categories to find the perfect tools for your specific needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-500 overflow-hidden p-6"
            >
              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <span className="text-2xl text-emerald-600">
                      {category.title.charAt(5)}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {category.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};