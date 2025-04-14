'use client';

// import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SubmitToolModal from '@/components/submit/SubmitToolModal';

// Add FAQ interface and data
interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How long does it take for my tool to be listed?",
    answer: "Free submissions typically take 2-3 weeks for review and listing. Premium submissions are prioritized and listed within 72 hours after approval."
  },
  {
    question: "What information do I need to submit my tool?",
    answer: "You'll need your tool's name, description, logo (min 200x200px), website URL, pricing details, and relevant categories. Additional screenshots and feature lists are recommended."
  },
  {
    question: "Can I edit my tool's information after submission?",
    answer: "Yes, you can update your tool's information at any time through your dashboard. Changes will be reviewed and typically approved within 24-48 hours."
  },
  {
    question: "What are the benefits of premium submission?",
    answer: "Premium submissions include priority listing within 72 hours, featured placement for 30 days, social media promotion, detailed analytics, and the ability to add custom screenshots and videos."
  },
  {
    question: "Do you offer refunds for premium submissions?",
    answer: "Yes, we offer a full refund if your tool is not listed within the promised 72-hour timeframe, or if your submission is rejected for any reason."
  },
  {
    question: "Can I submit multiple tools?",
    answer: "Yes, you can submit multiple tools. Each tool requires a separate submission, and volume discounts are available for premium submissions of 3 or more tools."
  }
];

export default function SubmitTool() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const openModal = (premium: boolean) => {
    setIsPremium(premium);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-50" />

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-100/30 via-emerald-50/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-b from-emerald-200/20 via-emerald-100/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-b from-emerald-100/20 via-emerald-50/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-emerald-100/30 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl animate-float" />
        
        {/* Subtle accent shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-emerald-200/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-emerald-100/20 rounded-full animate-reverse-spin" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-block mb-4 animate-fade-up">
              <span className="inline-flex items-center px-3 py-1 text-sm text-emerald-700 font-medium bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
                Submission
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight animate-fade-up [animation-delay:200ms]">
              Join the Largest Tool
              <span className="block">
                <span className="relative inline-block">
                  <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 blur-lg"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600">
                    Discovery Site
                  </span>
                </span>
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up [animation-delay:400ms]">
              2.4M people visited Find Next AI in 2024. Showcase your tool to potential buyers in 2025.
            </p>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-up [animation-delay:600ms]">
              {/* Free Card */}
              <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-emerald-50 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="text-left relative">
                  <span className="text-emerald-600 font-medium mb-2 block">Submit</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Free</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Join the largest tool discovery site in the world and submit your tool.
                  </p>
                  <button
                    onClick={() => openModal(false)}
                    className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Submit Your Tool
                  </button>
                </div>
              </div>

              {/* Premium Card */}
              <div className="group relative bg-gradient-to-b from-white to-emerald-50/30 rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-emerald-100 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="text-left relative">
                  <span className="text-emerald-600 font-medium mb-2 block">Skip the Queue</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    $99 <span className="text-sm font-normal text-gray-600">/one-off</span>
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Skip the queue, submitted within 72 hours & even more bonuses.
                  </p>
                  <button
                    onClick={() => openModal(true)}
                    className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Submit Your Tool
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-8 animate-fade-up">
            Trusted by popular tools loved by millions
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-up [animation-delay:200ms]">
            {/* Only showing tools with valid Clearbit logos */}
            <div className="flex items-center justify-center group">
              <div className="relative p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/clickup.com"
                  alt="ClickUp"
                  width={120}
                  height={30}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-center group">
              <div className="relative p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/notion.so"
                  alt="Notion"
                  width={120}
                  height={30}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-center group">
              <div className="relative p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/linear.app"
                  alt="Linear"
                  width={120}
                  height={30}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-center group">
              <div className="relative p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/figma.com"
                  alt="Figma"
                  width={120}
                  height={30}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-center group">
              <div className="relative p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/craft.do"
                  alt="Craft"
                  width={120}
                  height={30}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-center group">
              <div className="relative p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 w-full h-full flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/todoist.com"
                  alt="Todoist"
                  width={120}
                  height={30}
                  className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium inline-block mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about submitting your tool</p>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50"
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-2xl" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-tr-2xl" />
                </div>

                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 focus:outline-none relative"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold">
                        {index + 1}
                      </span>
                      {item.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-emerald-600 transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="py-3 pl-11">{item.answer}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Vendor Card */}
          <div className="relative mt-20">
            <div className="p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-800">
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-500/10 via-purple-400/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-emerald-500/10 via-emerald-400/5 to-transparent rounded-full blur-3xl" />
                
                {/* Animated shapes */}
                <div className="absolute top-1/4 right-1/4 w-72 h-72 border border-white/5 rounded-full animate-spin-slower" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full animate-reverse-spin" />
                
                {/* Dots pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>

              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="px-2 py-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 rounded-full">New</span>
                    <span className="ml-2 text-sm text-white/80">Vendor Program</span>
                  </div>

                  {/* Headline */}
                  <div className="space-y-4">
                    <h2 className="text-5xl font-bold text-white">
                      Become a Find Next AI Vendor
                      <span className="block mt-3 text-4xl bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                        Grow & protect your brand.
                      </span>
                    </h2>
                    
                    <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                      Join over dozens of others in the Find Next AI Vendor network. Unlock more and bring more eyes to your tools.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center gap-4 mt-4">
                    <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5">
                      <span className="relative z-10">Get started</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:bg-white/10" />
                    </button>

                    <a href="#learn-more" className="inline-flex items-center justify-center px-6 py-4 text-white/80 hover:text-white transition-colors duration-300">
                      Learn more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">2.4M+</div>
                    <div className="mt-2 text-white/60">Monthly Visitors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="mt-2 text-white/60">Listed Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">50K+</div>
                    <div className="mt-2 text-white/60">Monthly Clicks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubmitToolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isPremium={isPremium}
      />
    </div>
  );
} 