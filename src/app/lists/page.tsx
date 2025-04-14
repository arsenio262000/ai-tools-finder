'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal, Minus, Plus, ChevronRight, Check, X, Star } from 'lucide-react';

// Add local categories data
const categories = [
  {
    title: 'Best Project Management Tools',
    description: 'Discover the top project management tools for your workflow.',
    href: '/lists/project-management'
  },
  {
    title: 'Best Productivity Tools',
    description: 'Explore the most effective productivity tools available.',
    href: '/lists/productivity'
  },
  {
    title: 'Best Communication Tools',
    description: 'Find the best communication tools for your team.',
    href: '/lists/communication'
  },
  {
    title: 'Best Documentation Tools',
    description: 'Explore top documentation and knowledge management tools.',
    href: '/lists/documentation'
  }
];

const articles = [
  {
    title: "Best 10 Project Management Software",
    description: "Your team wants to know the best project management software to use as we head into 2025. Project...",
    image: "/articles/project-management.webp",
    gradient: "from-purple-600 to-blue-500",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/project-management-software"
  },
  {
    title: "Best Calendar Apps for 2024",
    description: "Finding the perfect calendar app can be hard. Picking a calendar application that helps you plan your week,...",
    gradient: "from-blue-600 to-blue-400",
    image: "/articles/calendar-apps.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/calendar-apps"
  },
  {
    title: "14 Best To-Do List Apps for 2025",
    description: "Choose the best to do list application for your needs handling tasks at work. Our selection and...",
    gradient: "from-blue-600 to-blue-400",
    image: "/articles/todo-apps.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/todo-apps"
  },
  {
    title: "6 Best Productivity Apps for New Parents",
    description: "Parents are time-poor so making sure they optimize their time is very important. Here's our most recommended...",
    image: "/articles/productivity-apps-parents.webp",
    gradient: "from-purple-600 to-blue-500",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/productivity-apps-parents"
  },
  {
    title: "Best 8 Shared Calendar Apps for Couples",
    description: "Create an in sync lifestyle for you and your partner by using a shared calendar app. This means you will no...",
    gradient: "from-blue-600 to-blue-400",
    image: "/articles/shared-calendar-apps.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/shared-calendar-apps"
  },
  {
    title: "10 Best Productivity Blogs in 2025",
    description: "Looking for ways to be more productive? Here are some of the best productivity blogs to teach you everything...",
    gradient: "from-blue-600 to-blue-400",
    image: "/articles/productivity-blogs.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/productivity-blogs"
  },
  {
    title: "10 Best Productivity Reads in 2025",
    description: "Here's our best picks of books to make you more productive. Each book provides tips, lessons and habits...",
    gradient: "from-purple-600 to-blue-500",
    image: "/articles/productivity-reads.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/productivity-reads"
  },
  {
    title: "5 Best Life Organization Apps in 2025",
    description: "Organization is one of the most helpful things you can have when it comes to work and life. Physical or...",
    gradient: "from-purple-600 to-blue-500",
    image: "/articles/life-organization-apps.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/life-organization-apps"
  },
  {
    title: "5 Best Shared To-Do Apps for Couples",
    description: "The best shared to-do list apps for couples to plan dates, for family to arrange holidays, for friends to...",
    gradient: "from-blue-600 to-blue-400",
    image: "/articles/shared-todo-apps.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/shared-todo-apps"
  },
  {
    title: "Best Daily Planner Apps for 2025",
    description: "Daily planner apps are a combination between calendar and tasks. A tool that can help you craft what needs to...",
    gradient: "from-purple-600 to-blue-400",
    image: "/articles/daily-planner-apps.webp",
    author: {
      name: "Francesco D'Alessio",
      avatar: "/authors/francesco.jpg"
    },
    href: "/lists/daily-planner-apps"
  }
];

const faqs = [
  {
    question: "Why are productivity lists helpful?",
    answer: "Productivity lists like the one on this page can help you boost productivity by helping to curate the best tools for the job. This can help save you time looking for exact tools."
  },
  {
    question: "Should I always download the tool?",
    answer: "Research is very important and these productivity lists can better serve as a way to help you find the right tool for you. Lists are designed to order and give you the best recommendations based on your scenario, device or field. Downloading the tool should only happen once you research in depth."
  },
  {
    question: "Why read productivity lists?",
    answer: "Productivity lists can be a good curation place for the best tools for work and life."
  }
];

export default function ListsPage() {
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [currentPage, setCurrentPage] = useState(1);
const [openFaq, setOpenFaq] = useState<number | null>(null);
const articlesPerPage = 6;

// Filter and paginate articles
const filteredCategories = categories.filter(category => {
const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    category.description.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCategory = selectedCategory === 'all' || category.title.toLowerCase().includes(selectedCategory.toLowerCase());
return matchesSearch && matchesCategory;
});

const totalPages = Math.ceil(articles.length / articlesPerPage);
const paginatedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

const useMemoCategories = useMemo(() => {
return [...new Set(categories.map(category => category.title))].sort();
}, [categories]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Curated Lists:
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600 mt-2">
                The Best Productivity Tools Ranked
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked collections of the best productivity tools, carefully curated and ranked to help you find the perfect solution for your workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map((article, index) => (
            <Link
              key={article.title}
              href={article.href}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Article Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-500/90 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative w-24 h-24 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={article.image || '/placeholder.png'}
                      alt={article.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {article.description}
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {article.author.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200 hover:bg-purple-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:border-purple-200 hover:bg-purple-50 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gray-500">Unlocking More with Lists</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Productivity Lists, Curated!
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openFaq === index ? (
                  <Minus className="w-5 h-5 text-gray-400" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 