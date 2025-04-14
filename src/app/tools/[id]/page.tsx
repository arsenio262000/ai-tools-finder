'use client';

import { tools } from '@/data/processed-tools';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle, Star, Calendar, Globe, Users, Zap, ArrowUpRight, ChevronRight, MessageSquare, AlertCircle, XCircle, ArrowLeft } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState('');
  const [yearsOfUsage, setYearsOfUsage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { number: 1, name: 'Design', description: 'Take into account the layout, color scheme, typography, and any innovative design elements that enhance the functionality and look of the application.', icon: '🎨', color: 'blue' },
    { number: 2, name: 'Value', description: 'Evaluate the cost versus the benefits gained from using the application. Consider the pricing structure, free versus premium features, and the overall return on investment.', icon: '💎', color: 'purple' },
    { number: 3, name: 'Features', description: 'Evaluate how the application\'s features improve efficiency and effectiveness, focusing on functionality, usability, and workflow simplification.', icon: '⚡', color: 'yellow' },
    { number: 4, name: 'Practicality', description: 'Focus on how effectively this application solves real-world problems and its ease of use, ensuring your feedback is grounded in practical scenarios.', icon: '🎯', color: 'green' },
    { number: 5, name: 'Performance', description: 'Assessing this app\'s performance involves examining its speed, responsiveness, and stability. Speed reflects how quickly the app executes tasks and loads content, while responsiveness gauges its agility in responding to user interactions.', icon: '⚡', color: 'orange' },
    { number: 6, name: 'Review', description: 'Write your review', icon: '✍️', color: 'violet' },
  ];

  const handleSubmitReview = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep - 1];
  const bgColorClass = {
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
    yellow: 'bg-yellow-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    violet: 'bg-violet-50'
  }[currentStepData.color];

  const textColorClass = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    violet: 'text-violet-600'
  }[currentStepData.color];

  const borderColorClass = {
    blue: 'border-blue-200',
    purple: 'border-purple-200',
    yellow: 'border-yellow-200',
    green: 'border-green-200',
    orange: 'border-orange-200',
    violet: 'border-violet-200'
  }[currentStepData.color];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
        </button>

        {/* Steps Header */}
        <div className="flex items-center space-x-8 mb-8 overflow-x-auto pb-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${currentStep === step.number
                ? `${bgColorClass} ${textColorClass}`
                : 'bg-gray-100 text-gray-400'
                }`}>
                <span className="text-lg">{step.icon}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">Step {step.number}</div>
              <div className={`text-sm ${currentStep === step.number ? `font-medium ${textColorClass}` : 'text-gray-400'}`}>
                {step.name}
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 6 ? (
          <div className="mb-8 space-y-6">
            {/* Summary Input */}
            <div>
              <input
                type="text"
                placeholder="Summarise your experience"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-700"
              />
              <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
                <span>Keep it short and sweet</span>
                <span className={`${summary.length >= 15 ? 'text-green-500' : 'text-gray-400'}`}>
                  {summary.length}/15 minimum
                </span>
              </div>
            </div>

            {/* Review Input */}
            <div>
              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all resize-none text-gray-700"
              />
              <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
                <span>Share your detailed experience</span>
                <span className={`${review.length >= 100 ? 'text-green-500' : 'text-gray-400'}`}>
                  {review.length}/100 minimum
                </span>
              </div>
            </div>

            {/* Years of Usage Dropdown */}
            <div>
              <select
                value={yearsOfUsage}
                onChange={(e) => setYearsOfUsage(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all appearance-none bg-white text-gray-700"
              >
                <option value="">Years of usage</option>
                <option value="less-than-6-months">Less than 6 months</option>
                <option value="6-months-to-1-year">6 months to 1 year</option>
                <option value="1-2-years">1-2 years</option>
                <option value="2-plus-years">2+ years</option>
              </select>
            </div>
          </div>
        ) : (
          <div className={`mb-8 p-6 rounded-xl ${bgColorClass} ${borderColorClass} border`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{currentStepData.icon}</span>
              <h2 className={`text-xl font-bold ${textColorClass}`}>{currentStepData.name}</h2>
            </div>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-2">
              {[...Array(10)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className="focus:outline-none transform transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${index < rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'stroke-[1.5px] text-gray-300'
                      }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                {rating === 0 ? 'Select your rating' : `You rated ${rating} out of 10`}
              </span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-8 border-t pt-6">
          <button
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-medium text-sm transition-all ${currentStep === 1
              ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => {
              if (currentStep < 6) {
                setCurrentStep(prev => prev + 1);
              } else {
                handleSubmitReview();
              }
            }}
            className={`flex items-center gap-2 px-8 py-3.5 text-white rounded-lg transition-all font-medium text-base shadow-lg hover:shadow-xl ${currentStep === 6
              ? 'bg-violet-600 hover:bg-violet-700 active:bg-violet-800'
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
              }`}
          >
            {currentStep === 6 ? (
              <>
                <span>Submit Review</span>
                <ArrowUpRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Next Step</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl transform transition-all scale-up-center">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Review Submitted!</h3>
              <p className="text-gray-600">Thank you for sharing your feedback</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ToolPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'integrations'>('overview');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Try to find the tool by exact ID first, then try with -1 suffix if not found
  const tool = tools.find((t) => t.id === params.id) || 
               tools.find((t) => t.id === `${params.id}-1`);

  if (!tool) {
    notFound();
  }

  const alternatives = tools
    .filter(t =>
      t.id !== tool.id &&
      t.categories.some(cat => tool.categories.includes(cat))
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button and Breadcrumb */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-black/70">
                <Link href="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/" className="hover:text-black">Home</Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-black font-medium">{tool.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Left Column - Logo and Basic Info */}
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl border shadow-sm overflow-hidden group">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Middle Column - Name, Description, Categories */}
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{tool.name}</h1>
                  {tool.isEditorChoice && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Editor&apos;s Choice
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4 max-w-2xl leading-relaxed">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.categories.map((category) => (
                    <Link
                      href={`/categories/${category}`}
                      key={category}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm hover:bg-purple-100 transition-colors font-medium"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column - Rating */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border hover:border-emerald-100 transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-emerald-700">7.9</div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4].map((i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 fill-gray-200 text-gray-200" />
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">User Rating</div>
                      <div className="text-gray-500">Based on 10 reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl border hover:border-emerald-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50/50 rounded-lg group-hover:bg-blue-100/50 transition-colors">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">Platforms</div>
                    <div className="font-medium text-gray-900">{tool.platforms.length} Supported</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border hover:border-emerald-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50/50 rounded-lg group-hover:bg-purple-100/50 transition-colors">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">User Types</div>
                    <div className="font-medium text-gray-900">{tool.userTypes.length} Types</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border hover:border-emerald-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-50/50 rounded-lg group-hover:bg-yellow-100/50 transition-colors">
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">Features</div>
                    <div className="font-medium text-gray-900">12+ Features</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border hover:border-emerald-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50/50 rounded-lg group-hover:bg-orange-100/50 transition-colors">
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-700">Last Updated</div>
                    <div className="font-medium text-gray-900">12 Feb 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mt-8 border-b">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 text-sm font-medium border-b-2 flex items-center gap-2 ${activeTab === 'overview'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-700 hover:text-gray-900'
                    }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 text-sm font-medium border-b-2 flex items-center gap-2 ${activeTab === 'reviews'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-700 hover:text-gray-900'
                    }`}
                >
                  <span>Reviews</span>
                  <span className="px-2 py-0.5 bg-emerald-50 rounded-full text-xs font-medium text-emerald-600">10</span>
                </button>
                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`pb-4 text-sm font-medium border-b-2 flex items-center gap-2 ${activeTab === 'integrations'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-700 hover:text-gray-900'
                    }`}
                >
                  Integrations
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Features */}
              <div className="md:col-span-2 space-y-6">
                {/* Review Title Card */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">{tool.name} Review</h2>
                  <h3 className="text-lg font-semibold text-black mb-3">Top Features, Pros, Cons & User Reviews</h3>
                  <p className="text-black/80 leading-relaxed">
                    <Link href="#" className="text-emerald-600 hover:text-emerald-700">{tool.name}</Link> {tool.description}
                  </p>
                </div>

                {/* What is Tool Card */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">What is {tool.name}?</h2>
                  <div className="space-y-4">
                    <p className="text-black/80 leading-relaxed">
                      {tool.name} is available on {tool.platforms.map(platform =>
                        <Link key={platform} href="#" className="text-emerald-600 hover:text-emerald-700">{platform}</Link>
                      ).join(', ')}. {tool.description}
                    </p>
                  </div>
                </div>

                {/* Who is Tool best for Card */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">Who is {tool.name} best for?</h2>
                  <div className="space-y-4">
                    <p className="text-black/80 leading-relaxed">
                      These are the types of people that will benefit from {tool.name}:
                    </p>
                    <ul className="space-y-3 text-black/80">
                      {tool.roles.map((role, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="p-1 bg-emerald-100 rounded-full mt-1 shrink-0">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span>{role} looking for {tool.categories[index % tool.categories.length]} solutions</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Should I get Tool Card */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">Should I get {tool.name}?</h2>
                  <div className="space-y-4">
                    <p className="text-black/80 leading-relaxed">
                      {tool.name} offers {tool.pricing.includes('free') ? 'both free and paid plans' : 'subscription-based pricing'}, making it {tool.pricing.includes('free') ? 'accessible to users with different needs' : 'a premium solution for serious users'}. The platform is known for its {tool.customizability} level of customizability, allowing users to adapt it to their specific needs.
                    </p>
                  </div>
                </div>

                {/* Who is Tool best suited for Card */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">Who is {tool.name} best suited for?</h2>
                  <p className="text-black/80 mb-4">These are the types of people that will benefit from {tool.name}:</p>
                  <ul className="space-y-3 text-black/80">
                    {tool.roles.map((role, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-100 rounded-full mt-1 shrink-0">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>{role} looking for {tool.categories[index % tool.categories.length]} solutions</span>
                      </li>
                    ))}
                    {tool.userTypes.map((type, index) => (
                      <li key={`type-${index}`} className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-100 rounded-full mt-1 shrink-0">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>{type} users who need {tool.categories[index % tool.categories.length]} functionality</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternatives Section */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-lg font-semibold text-black mb-4">Alternative Tools</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {alternatives.map((alt) => (
                      <Link
                        key={alt.id}
                        href={`/tools/${alt.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:border-emerald-200 hover:shadow-sm transition-all group"
                      >
                        <div className="relative w-10 h-10 bg-white rounded-lg border">
                          <Image
                            src={alt.logo}
                            alt={alt.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <div className="font-medium group-hover:text-emerald-600 transition-colors">{alt.name}</div>
                          <div className="text-xs text-gray-500">Similar tool</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Features Card */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">{tool.name.toUpperCase()} FEATURES</h2>
                  <ul className="space-y-4">
                    {tool.categories.map((category, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50/50 transition-colors">
                        <div className="p-1 bg-emerald-100 rounded-full mt-0.5 shrink-0">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <span className="text-sm text-black/80 leading-relaxed">
                            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} functionality
                          </span>
                          <div className="mt-1 text-xs text-emerald-600 font-medium">
                            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons Card */}
                <div className="bg-white rounded-xl border hover:border-red-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">LIMITATIONS</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50/50 transition-colors">
                      <div className="p-1 bg-red-100 rounded-full mt-0.5 shrink-0">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <span className="text-sm text-black/80 leading-relaxed">
                          The iOS and Android apps need improvement
                        </span>
                        <div className="mt-1 text-xs text-red-600 font-medium">Mobile Experience</div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border hover:border-emerald-100 transition-colors p-6">
                  <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border hover:border-emerald-200 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-emerald-500" />
                        <span className="font-medium group-hover:text-emerald-600">Write a Review</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Header Section with Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Rating Overview */}
                <div className="bg-white p-6 rounded-xl border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-5xl font-bold text-gray-900">7.9</div>
                        <div className="text-sm text-gray-500 mt-1">out of 10</div>
                      </div>
                      <div className="h-12 w-px bg-gray-200 mx-2"></div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="w-5 h-5 fill-gray-200 text-gray-200" />
                        </div>
                        <div className="text-sm text-gray-500">Based on 10 reviews</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Design</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <div className="w-8 text-sm font-medium">8.2</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Performance</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '71%' }}></div>
                      </div>
                      <div className="w-8 text-sm font-medium">7.1</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Value</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '77%' }}></div>
                      </div>
                      <div className="w-8 text-sm font-medium">7.7</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Features</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                      <div className="w-8 text-sm font-medium">8.3</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">Practicality</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <div className="w-8 text-sm font-medium">8.0</div>
                    </div>
                  </div>
                </div>

                {/* Middle Column - AI Summary */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">AI Review Summary</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {tool.name} is widely appreciated for its ability to consolidate tasks, emails, and calendars into a single, seamless productivity hub. Users commend its robust time-blocking features, quick capture, and extensive app integrations, including Jira, Todoist, and email platforms, making it a powerhouse for managing complex workflows.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="px-3 py-1 bg-emerald-50 rounded-full text-sm text-emerald-700">
                          ✨ Strong Integration Support
                        </div>
                        <div className="px-3 py-1 bg-emerald-50 rounded-full text-sm text-emerald-700">
                          🎯 Excellent Time Blocking
                        </div>
                        <div className="px-3 py-1 bg-emerald-50 rounded-full text-sm text-emerald-700">
                          📱 Desktop-First Design
                        </div>
                        <div className="px-3 py-1 bg-red-50 rounded-full text-sm text-red-700">
                          💰 Premium Pricing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters and Actions */}
              <div className="bg-white p-4 rounded-xl border">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Write a Review</span>
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amit's Review */}
                <div className="bg-white p-6 rounded-xl border hover:border-emerald-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-indigo-600">AP</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">Amit Puri</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>17 Jan 2025</span>
                            <span className="px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-600 font-medium">
                              Productivity Potion Maker
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">My Control Panel</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>- Tasks, lists, todos, checklists, meeting notes</li>
                          <li>- 4 calendars</li>
                          <li>- Both timezones</li>
                          <li>- Option+Space = Create Task on the fly</li>
                          <li>- Next meeting in 7 mins</li>
                          <li>- Next meeting starts in 2 mins</li>
                          <li>- Todo list on the fly</li>
                          <li>- Someday list</li>
                          <li>- Convert emails into tasks</li>
                          <li>- Start day planner</li>
                          <li>- My asana, jira and other high priority tasks!</li>
                        </ul>
                        <p className="mt-4 text-gray-600">
                          Things I use everyday, basically all of their core features I use e-v-e-r-y-d-a-y!
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Use: 4Y</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sarah's Review */}
                <div className="bg-white p-6 rounded-xl border hover:border-emerald-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-emerald-600">SC</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">Sarah Chen</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>15 Jan 2025</span>
                            <span className="px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-600 font-medium">
                              PhD Researcher
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          {[9, 10].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Great for Academic Planning</h4>
                        <p className="text-gray-600 mb-3">
                          As a PhD researcher, I needed a tool that could help me manage multiple research projects, deadlines, and teaching responsibilities. {tool.name} has been instrumental in keeping everything organized.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li>- Perfect for managing research deadlines and conference submissions</li>
                          <li>- Time blocking helps me dedicate focused time to writing</li>
                          <li>- Calendar integration works seamlessly with university schedules</li>
                          <li>- Task consolidation from various academic platforms is helpful</li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Use: 1Y</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marcus's Review */}
                <div className="bg-white p-6 rounded-xl border hover:border-emerald-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-blue-600">MR</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">Marcus Rodriguez</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>10 Jan 2025</span>
                            <span className="px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-600 font-medium">
                              Freelance Developer
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          {[10].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        A Freelancer&apos;s Best Friend
                        <p className="text-gray-600 mb-3">
                          Managing multiple client projects used to be a nightmare until I found {tool.name}. The ability to consolidate tasks from different project management tools is a game-changer.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li>- Integrates perfectly with GitHub, Jira, and Trello</li>
                          <li>- Time blocking helps me manage client work effectively</li>
                          <li>- Quick capture feature is invaluable during client calls</li>
                          <li>- Meeting scheduling makes client coordination effortless</li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Use: 2Y</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Verified Purchase</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emma's Review */}
                <div className="bg-white p-6 rounded-xl border hover:border-emerald-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-purple-600">ET</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">Emma Thompson</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>5 Jan 2025</span>
                            <span className="px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-600 font-medium">
                              Marketing Manager
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          {[7, 8, 9, 10].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Good but Room for Improvement</h4>
                        <p className="text-gray-600 mb-3">
                          While {tool.name} has some great features, there are a few areas where it could improve. The mobile experience isn&apos;t as polished as the desktop version.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li>+ Pros:</li>
                          <li>- Excellent calendar integration</li>
                          <li>- Good task management features</li>
                          <li>- Helpful keyboard shortcuts</li>
                          <li>- Cons:</li>
                          <li>- Mobile app needs work</li>
                          <li>- Occasional sync issues</li>
                          <li>- Pricing is on the higher side</li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Use: 6M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* David's Review */}
                <div className="bg-white p-6 rounded-xl border hover:border-emerald-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-orange-600">DK</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">David Kim</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>1 Jan 2025</span>
                            <span className="px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-600 font-medium">
                              Business Analyst
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          {[10].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Powerful for Data-Driven Planning</h4>
                        <p className="text-gray-600 mb-3">
                          As a business analyst, I deal with multiple projects and stakeholders. {tool.name} helps me stay on top of everything with its powerful organization features.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li>- Excellent for managing multiple project timelines</li>
                          <li>- AI features help prioritize tasks effectively</li>
                          <li>- Great integration with business tools (Slack, Teams)</li>
                          <li>- The analytics feature helps track productivity</li>
                          <li>- Calendar blocking is perfect for focused work</li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Use: 1.5Y</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-2 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            <span className="font-medium">Verified Purchase</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Load More Button */}
              <div className="text-center">
                <button className="px-6 py-3 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Load More Reviews
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Integrations</h2>
                  <p className="text-sm text-gray-600 mt-1">Connect {tool.name} with your favorite tools</p>
                </div>
              </div>
              <div className="text-gray-600 text-center py-12">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-1">Coming Soon</h3>
                <p>Integration information will be available soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </main>
  );
} 