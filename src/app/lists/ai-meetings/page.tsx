"use client"
import React, { useState, useEffect } from 'react';
import { Video, FileText, BrainCircuit, ListTodo, Share2, Search, Star } from 'lucide-react';
import { format } from 'date-fns';

export default function AIMeetingsPage() {
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
    { icon: <Video className="w-6 h-6 text-white" />, title: 'Smart Recording', description: 'Automated meeting capture', color: 'from-blue-400 to-blue-500' },
    { icon: <FileText className="w-6 h-6 text-white" />, title: 'AI Transcription', description: 'Real-time speech to text', color: 'from-indigo-400 to-indigo-500' },
    { icon: <BrainCircuit className="w-6 h-6 text-white" />, title: 'Smart Summary', description: 'Key points extraction', color: 'from-purple-400 to-purple-500' },
    { icon: <ListTodo className="w-6 h-6 text-white" />, title: 'Action Items', description: 'Auto-generated tasks', color: 'from-pink-400 to-pink-500' },
    { icon: <Share2 className="w-6 h-6 text-white" />, title: 'Easy Sharing', description: 'Instant collaboration', color: 'from-cyan-400 to-cyan-500' },
    { icon: <Search className="w-6 h-6 text-white" />, title: 'Smart Search', description: 'Find any moment instantly', color: 'from-teal-400 to-teal-500' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white overflow-hidden">
        {/* Hero Content */}
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">AI Meetings</h1>
            <p className="text-base text-white/80 mb-8">
              Transform your meetings with AI.
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
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
      </div>
    </main>
  );
} 