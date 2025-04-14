'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, X, Star, ListTodo, Users, Zap, Calendar, BarChart2, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { projectManagementTools } from '@/data/project-management-tools';
import LogoPlaceholder from '@/components/LogoPlaceholder';

// Helper function to handle logo display
function LogoImage({ tool }: { tool: typeof projectManagementTools[0] }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <LogoPlaceholder name={tool.name} />;
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={tool.logo}
        alt={`${tool.name} logo`}
        width={64}
        height={64}
        className="w-full h-full object-contain p-2"
        onError={() => setImageError(true)}
        priority={true}
      />
    </div>
  );
}

export default function ProjectManagementPage() {
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
    { icon: <ListTodo className="w-6 h-6 text-white" />, title: 'Task Management', description: 'Organize and track tasks efficiently', color: 'from-emerald-400 to-emerald-500' },
    { icon: <Users className="w-6 h-6 text-white" />, title: 'Team Collaboration', description: 'Work together seamlessly', color: 'from-blue-400 to-blue-500' },
    { icon: <Calendar className="w-6 h-6 text-white" />, title: 'Project Planning', description: 'Plan and schedule effectively', color: 'from-purple-400 to-purple-500' },
    { icon: <BarChart2 className="w-6 h-6 text-white" />, title: 'Analytics', description: 'Track progress and performance', color: 'from-orange-400 to-orange-500' },
    { icon: <Zap className="w-6 h-6 text-white" />, title: 'Automation', description: 'Streamline repetitive work', color: 'from-pink-400 to-pink-500' },
    { icon: <Settings className="w-6 h-6 text-white" />, title: 'Customization', description: 'Adapt to your workflow', color: 'from-cyan-400 to-cyan-500' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-500 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-emerald-100 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/lists" className="hover:text-white transition-colors">
              Lists
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Best Project Management Software</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best 10 Project Management Software for 2025
            </h1>

            <p className="text-lg text-emerald-100 mb-6 max-w-3xl">
              Discover the most powerful and user-friendly project management tools that will help your team collaborate better and deliver projects successfully.
            </p>

            {formattedDate && (
              <div className="flex items-center gap-2 text-emerald-100 text-sm">
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
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-emerald-600/10" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Comparison Table */}
        <div className="mb-16 overflow-x-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Comparison</h2>
          <div className="min-w-max">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900 border-b border-emerald-100">Tool</th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900 border-b border-emerald-100">Best For</th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900 border-b border-emerald-100">Pricing Starts At</th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900 border-b border-emerald-100">Key Strength</th>
                  <th className="p-4 text-left text-sm font-semibold text-emerald-900 border-b border-emerald-100">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectManagementTools.map((tool, index) => (
                  <tr 
                    key={tool.id} 
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-emerald-50/50 transition-colors`}
                  >
                    <td className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden">
                          <LogoImage tool={tool} />
                        </div>
                        <span className="font-medium text-gray-900">{tool.name}</span>
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {tool.bestFor.slice(0, 2).map((item) => (
                          <span key={item} className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{tool.pricing.startingPrice}</span>
                        {tool.pricing.free && (
                          <span className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full">
                            Free plan
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      <span className="text-gray-600">{tool.pros[0]}</span>
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Visit
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tool Listings */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Detailed Tool Reviews</h2>
          <div className="space-y-12">
            {projectManagementTools.map((tool, index) => (
              <div 
                key={tool.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Tool Header */}
                <div className="p-8 flex items-start gap-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-bl-[100px] transition-all duration-300 group-hover:scale-150 group-hover:opacity-50" />
                  
                  <div className="w-16 h-16 flex-shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-lg">
                    <LogoImage tool={tool} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                      <span className="px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full">
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
                      <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Star className="w-4 h-4 text-emerald-600" />
                      </span>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                      Best For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.bestFor.map((item) => (
                        <span 
                          key={item}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </span>
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {tool.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
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
                        <span className="px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">
                          Free plan available
                        </span>
                      )}
                    </div>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100 transform hover:-translate-y-0.5"
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
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-12deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
} 