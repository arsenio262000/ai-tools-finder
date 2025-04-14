'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, X, Star, Mail, Filter, BrainCircuit, Calendar, Sparkles, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { aiEmailTools } from '@/data/ai-email-tools';
import LogoPlaceholder from '@/components/LogoPlaceholder';

// Helper function to check if image exists
function LogoImage({ tool }: { tool: typeof aiEmailTools[0] }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <LogoPlaceholder name={tool.name} />;
  }

  return (
    <Image
      src={tool.logo}
      alt={tool.name}
      width={64}
      height={64}
      className="w-full h-full object-contain p-2"
      onError={() => setImageError(true)}
    />
  );
}

export default function AIEmailPage() {
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const stableDate = new Date(today.getFullYear(), today.getMonth(), 1);
    setFormattedDate(format(stableDate, 'MMM yyyy'));
  }, []);

  if (!mounted) return null;

  const features = [
    { icon: <Mail className="w-6 h-6 text-white" />, title: 'Smart Inbox', description: 'AI-powered organization', color: 'from-blue-400 to-blue-500' },
    { icon: <BrainCircuit className="w-6 h-6 text-white" />, title: 'Auto Replies', description: 'Intelligent responses', color: 'from-indigo-400 to-indigo-500' },
    { icon: <Filter className="w-6 h-6 text-white" />, title: 'Smart Filtering', description: 'Priority management', color: 'from-purple-400 to-purple-500' },
    { icon: <Calendar className="w-6 h-6 text-white" />, title: 'Scheduling', description: 'Meeting coordination', color: 'from-pink-400 to-pink-500' },
    { icon: <Sparkles className="w-6 h-6 text-white" />, title: 'Writing Assistant', description: 'Better emails faster', color: 'from-cyan-400 to-cyan-500' },
    { icon: <Shield className="w-6 h-6 text-white" />, title: 'Security', description: 'Advanced protection', color: 'from-teal-400 to-teal-500' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-teal-100 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/lists" className="hover:text-white transition-colors">
              Lists
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Best AI Email Management Tools</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best AI Email Management Tools for 2025
            </h1>

            <p className="text-lg text-teal-100 mb-6 max-w-3xl">
              Discover AI-powered email tools that help you achieve inbox zero, automate responses, 
              and manage your communications more efficiently than ever before.
            </p>

            {formattedDate && (
              <div className="flex items-center gap-2 text-blue-100 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>Updated: {formattedDate}</span>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300`}
                style={{ 
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-teal-600/10" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-600 leading-relaxed text-lg">
            Email management has evolved with AI technology, offering smart solutions to handle the 
            ever-increasing volume of emails. These tools help you sort, prioritize, and respond to 
            emails more efficiently, saving hours of your valuable time.
          </p>

          <p className="text-gray-600 leading-relaxed mt-6">
            From intelligent filtering to automated responses, AI email tools are transforming how we 
            handle our inboxes and helping professionals maintain better email hygiene.
          </p>
        </div>

        {/* What is section */}
        <div className="mb-16 bg-teal-50 rounded-2xl p-8 border border-teal-100">
          <h2 className="text-3xl font-bold text-teal-900 mb-6">
            What are AI Email Management Tools?
          </h2>
          <p className="text-teal-800 leading-relaxed">
            AI Email Management Tools are intelligent applications that use artificial intelligence to help you 
            organize, prioritize, and respond to emails more effectively. They can{' '}
            <Link href="/lists/productivity" className="text-teal-600 hover:text-teal-700 transition-colors font-medium">
              automatically categorize
            </Link>
            {' '}emails, suggest responses, and help you maintain a clean inbox with minimal effort.
          </p>
        </div>

        {/* Tool listings */}
        <div className="space-y-12">
          {aiEmailTools.map((tool, index) => (
            <div 
              key={tool.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Tool Header */}
              <div className="p-8 flex items-start gap-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-teal-500/10 rounded-bl-[100px] transition-all duration-300 group-hover:scale-150 group-hover:opacity-50" />
                
                <div className="w-16 h-16 flex-shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-lg">
                  <LogoImage tool={tool} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                    <span className="px-3 py-1 text-sm font-medium text-teal-700 bg-teal-50 rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </div>

              {/* Tool Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-gray-50/80">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-teal-600" />
                    </span>
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-emerald-600" />
                    </span>
                    Best For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.bestFor.map((item) => (
                      <span 
                        key={item}
                        className="px-3 py-1 text-sm bg-emerald-50 text-emerald-700 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros & Cons */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-teal-600" />
                    </span>
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {tool.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-600" />
                    </span>
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {tool.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-gray-600">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing Footer */}
              <div className="px-8 py-6 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="font-semibold text-gray-900">{tool.pricing.startingPrice}</div>
                    </div>
                    {tool.pricing.free && (
                      <span className="px-3 py-1 text-sm font-medium text-teal-700 bg-teal-50 rounded-full border border-teal-100">
                        Free plan available
                      </span>
                    )}
                  </div>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700 transition-all duration-300 hover:shadow-lg hover:shadow-teal-100 transform hover:-translate-y-0.5"
                  >
                    Visit Website
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 