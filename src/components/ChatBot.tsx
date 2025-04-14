'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, ChevronDown, Maximize2, Minimize2, Smile, PaperclipIcon, Star, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '@/data/processed-tools';
import { Tool } from '@/types';
import Link from 'next/link';
import { ImageWithFallback } from './ImageWithFallback';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  tools?: Tool[];
}

const generateUniqueId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateUniqueId(),
      type: 'bot',
      content: "👋 Hi! I'm your Find Next AI assistant. Tell me what kind of tool you're looking for, and I'll help you find the perfect match!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantTools = (query: string): Tool[] => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    // Score each tool based on relevance
    const scoredTools = tools
      .filter(tool => {
        // Only include tools that have Clearbit logos (URLs containing clearbit.com)
        const hasValidLogo = tool.logo.includes('clearbit.com');
        return hasValidLogo;
      })
      .map(tool => {
        let score = 0;
        
        // Check exact category matches (highest priority)
        if (tool.categories.some(cat => 
          searchTerms.some(term => cat.toLowerCase().includes(term))
        )) {
          score += 10;
        }

        // Check name matches
        if (searchTerms.some(term => tool.name.toLowerCase().includes(term))) {
          score += 5;
        }

        // Check description matches
        if (searchTerms.some(term => tool.description.toLowerCase().includes(term))) {
          score += 3;
        }

        // Boost score for editor's choice
        if (tool.isEditorChoice) {
          score += 2;
        }

        return { tool, score };
      });

    // Sort by score and return top 3 tools with valid logos
    const relevantTools = scoredTools
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.tool)
      .slice(0, 3);

    // If no relevant tools found, return top 3 tools with valid logos
    if (relevantTools.length === 0) {
      return tools
        .filter(tool => tool.logo.includes('clearbit.com'))
        .slice(0, 3);
    }

    return relevantTools;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      type: 'user',
      content: inputValue
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const relevantTools = findRelevantTools(inputValue);

      // Generate response based on found tools
      let response = '';
      if (relevantTools.length > 0) {
        response = "Here are some great tools that match your needs:";
      } else {
        response = "I couldn't find exact matches for your request. Here are some popular tools you might want to check out:";
      }

      const botMessage: Message = {
        id: generateUniqueId(),
        type: 'bot',
        content: response,
        tools: relevantTools.length > 0 ? relevantTools : tools.slice(0, 3)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Add auto-resize functionality for textarea
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  return (
    <>
      {/* Trigger Button with enhanced animation */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 group ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </motion.button>

      {/* Chat Window with enhanced styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ${
              isMinimized ? 'h-auto' : 'h-[600px]'
            }`}
          >
            {/* Enhanced Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Find Next AI</h3>
                  <p className="text-sm text-emerald-50">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-5 h-5" />
                  ) : (
                    <Minimize2 className="w-5 h-5" />
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area with adjusted height */}
                <div className="flex-1 p-4 overflow-y-auto h-[calc(600px-130px)] bg-gradient-to-b from-gray-50 to-white">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <motion.div 
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`flex ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              message.type === 'user'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-white border border-gray-100 shadow-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                        {message.tools && (
                          <div className="mt-3 space-y-2">
                            {message.tools.map((tool) => (
                              <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Link
                                  href={`/tools/${tool.id}`}
                                  className="block bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 bg-white">
                                      <ImageWithFallback
                                        src={tool.logo}
                                        alt={tool.name}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-contain p-1"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900">
                                          {tool.name}
                                        </h4>
                                        {tool.isEditorChoice && (
                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800">
                                            <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" />
                                            Editor's Choice
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {tool.description}
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {tool.categories.slice(0, 2).map((category, index) => (
                                          <span
                                            key={index}
                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700"
                                          >
                                            <Tag className="w-3 h-3 mr-1" />
                                            {category}
                                          </span>
                                        ))}
                                        {tool.pricing.includes('free') && (
                                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                            Free Plan
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area with fixed height */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100">
                    <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                      <div className="flex-1 relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none opacity-70">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                        </div>
                        <textarea
                          ref={inputRef}
                          value={inputValue}
                          onChange={handleTextareaChange}
                          onKeyDown={handleKeyPress}
                          placeholder="Ask me about any type of tool..."
                          className="w-full pl-10 pr-12 py-2.5 text-sm bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none transition-all placeholder:text-gray-400"
                          style={{
                            minHeight: '42px',
                            maxHeight: '120px'
                          }}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-100/80 border border-gray-200/50">
                            <span className="text-[10px] font-medium text-gray-400">⌘</span>
                            <span className="text-[10px] font-medium text-gray-400">⏎</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${
                          inputValue.trim() && !isTyping
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 