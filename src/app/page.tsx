'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { FloatingLogos } from '@/components/FloatingLogos';
import { tools } from '@/data/processed-tools';
import { Tool } from '@/types';
import { Sparkles, Search, ExternalLink, Rocket, Star } from 'lucide-react';

// Dynamically import components that use client-side features
const SearchBar = dynamic(() => import('@/components/SearchBar'), {
  ssr: false
});

const FilterBar = dynamic(() => import('@/components/FilterBar'), {
  ssr: false
});

const ToolGrid = dynamic(() => import('@/components/ToolGrid'), {
  ssr: false
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([]);
  const [selectedDeployments, setSelectedDeployments] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCustomizability, setSelectedCustomizability] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [view, setView] = useState<'popular' | 'new'>('popular');

  // Apply all filters
  const applyFilters = (toolsToFilter: Tool[]) => {
    return toolsToFilter.filter(tool => {
      const matchesCategories = selectedCategories.length === 0 ||
        selectedCategories.some(cat => tool.categories.includes(cat));

      const matchesPlatforms = selectedPlatforms.length === 0 ||
        selectedPlatforms.some(platform => tool.platforms.includes(platform));

      const matchesRoles = selectedRoles.length === 0 ||
        selectedRoles.some(role => tool.roles.includes(role));

      const matchesUserTypes = selectedUserTypes.length === 0 ||
        selectedUserTypes.some(type => tool.userTypes.includes(type));

      const matchesDeployments = selectedDeployments.length === 0 ||
        selectedDeployments.some(deployment => tool.deployments.includes(deployment));

      const matchesIndustries = selectedIndustries.length === 0 ||
        selectedIndustries.some(industry => tool.industries.includes(industry));

      const matchesCustomizability = selectedCustomizability.length === 0 ||
        selectedCustomizability.includes(tool.customizability);

      const matchesPricing = selectedPricing.length === 0 ||
        selectedPricing.some(price => tool.pricing.includes(price));

      return matchesCategories && matchesPlatforms && matchesRoles &&
        matchesUserTypes && matchesDeployments && matchesIndustries &&
        matchesCustomizability && matchesPricing;
    });
  };

  // Handle search results
  const handleSearch = (searchResults: Tool[]) => {
    const filtered = applyFilters(searchResults);
    setFilteredTools(filtered);
  };

  // Apply filters when any filter changes
  useEffect(() => {
    const filtered = applyFilters(tools);
    setFilteredTools(filtered);
  }, [
    selectedCategories,
    selectedPlatforms,
    selectedRoles,
    selectedUserTypes,
    selectedDeployments,
    selectedIndustries,
    selectedCustomizability,
    selectedPricing
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient Orbs */}
          <div className="absolute -top-20 left-10 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse -z-10" />
          <div className="absolute -bottom-10 right-20 w-[350px] h-[350px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse delay-700 -z-10" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[130px] animate-pulse delay-1000 -z-10" />
        </div>

        {/* Floating Logos */}
        <FloatingLogos />

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Eyebrow text */}
            <div className="flex items-center justify-center space-x-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-emerald-700 font-medium bg-emerald-50 rounded-full border border-emerald-100 shadow-sm animate-fade-in">
                <Rocket className="w-4 h-4" />
                <span>Find the perfect tool for your workflow</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-700 font-medium bg-purple-50 rounded-full border border-purple-100 shadow-sm animate-fade-in [animation-delay:200ms]">
                <Star className="w-4 h-4" />
                <span>{tools.length.toLocaleString()} Tools Available</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-black">
              <span className="inline-block animate-fade-up">
                Every piece of software
              </span>
              <br />
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 blur-lg"></span>
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 animate-fade-up [animation-delay:200ms]">
                  worth knowing
                </span>
              </span>
              <span className="inline-block text-black animate-fade-up [animation-delay:400ms]">
                —one click away
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-black/80 animate-fade-up [animation-delay:600ms]">
              Discover and compare the best software tools for your needs. From productivity apps to development tools, we&apos;ve got you covered.
            </p>

            {/* Search Bar */}
            <div className="mt-8">
              <SearchBar onSearch={(query) => {
                setSearchQuery(query);
                const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
                
                if (!query.trim()) {
                  setFilteredTools(tools);
                  return;
                }

                const filtered = tools.filter(tool => {
                  const searchableText = [
                    tool.name,
                    tool.description,
                    ...tool.categories,
                    ...tool.platforms,
                    ...tool.pricing,
                    ...tool.roles,
                    ...tool.userTypes,
                    ...tool.deployments,
                    ...tool.industries,
                    tool.customizability
                  ].join(' ').toLowerCase();

                  return searchTerms.every(term => searchableText.includes(term));
                });

                setFilteredTools(filtered);
              }} />
            </div>

            {/* Presented by */}
            <div className="mt-8 flex items-center justify-center space-x-3 text-sm text-black/70">
              <span>Sponsored by:</span>
              <a href="https://ubizlink.com" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-black/80">uBizLink</span>
                <ExternalLink className="w-4 h-4 text-emerald-600 transform transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        tools={tools}
        onSearch={handleSearch}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        selectedUserTypes={selectedUserTypes}
        setSelectedUserTypes={setSelectedUserTypes}
        selectedDeployments={selectedDeployments}
        setSelectedDeployments={setSelectedDeployments}
        selectedIndustries={selectedIndustries}
        setSelectedIndustries={setSelectedIndustries}
        selectedCustomizability={selectedCustomizability}
        setSelectedCustomizability={setSelectedCustomizability}
        selectedPricing={selectedPricing}
        setSelectedPricing={setSelectedPricing}
        view={view}
        setView={setView}
      />

      {/* Tool Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolGrid
          tools={filteredTools}
          view={view}
          endpoint="/api/tools/saved"
        />
      </div>

      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-black mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Let&apos;s find the perfect tools for you</span>
        </h3>
        <p className="text-black/70">
          Browse our curated collection of tools and discover what works best for your needs.
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-600">
            Made with{' '}
            <span className="inline-block animate-pulse text-red-500">❤️</span>
            {' '}by{' '}
            <a 
              href="https://www.ubizlink.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              uBizLink
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
