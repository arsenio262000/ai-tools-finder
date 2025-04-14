'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Tags,
  ClipboardList,
  Pencil,
  CheckSquare,
  Calendar,
  Mail,
  Target,
  Bot,
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  Brain,
  Zap,
  Home,
  Network,
  Table,
  Lock,
  Wrench,
  FileText,
  UsersRound,
  Palette,
  Flower2,
  FileEdit,
  GanttChart,
  Repeat,
  FolderOpen,
  Key,
  Focus,
  BookType,
  CheckCircle,
  PenTool,
  Timer,
  MessageSquare,
  Inbox,
  Gift,
  Monitor,
  Globe,
  Apple,
  Smartphone,
  Plug,
  Terminal,
  MonitorCheck,
  Command,
  UserRound,
  UserCog,
  Rocket,
  Code,
  Settings,
  GraduationCap,
  Paintbrush,
  Lightbulb,
  Building2,
  Cloud,
  Factory,
  LineChart,
  DollarSign,
  School,
  Wrench as ToolIcon,
  Star,
  Coins,
  RefreshCw,
  Flame,
  Sparkles
} from 'lucide-react';
import { Tool } from '@/data/tools';

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactElement;
}

const categories: FilterOption[] = [
  { id: 'all', label: 'All Categories', icon: <Tags className="w-5 h-5" /> },
  { id: 'project-management', label: 'Project Management', icon: <ClipboardList className="w-5 h-5" /> },
  { id: 'note-taking', label: 'Note-Taking', icon: <Pencil className="w-5 h-5" /> },
  { id: 'todo-list', label: 'To Do List Apps', icon: <CheckSquare className="w-5 h-5" /> },
  { id: 'calendar', label: 'Calendar Apps', icon: <Calendar className="w-5 h-5" /> },
  { id: 'email', label: 'Email Apps', icon: <Mail className="w-5 h-5" /> },
  { id: 'all-in-one', label: 'All-In-One Apps', icon: <Target className="w-5 h-5" /> },
  { id: 'ai-tools', label: 'AI Tools', icon: <Bot className="w-5 h-5" /> },
  { id: 'habit-tracking', label: 'Habit Tracking', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'meeting-schedulers', label: 'Meeting Schedulers', icon: <Users className="w-5 h-5" /> },
  { id: 'daily-planners', label: 'Daily Planners', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'crm-software', label: 'CRM Software', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'pkm-apps', label: 'PKM Apps', icon: <Brain className="w-5 h-5" /> },
  { id: 'workflow-auto', label: 'Workflow Auto', icon: <Zap className="w-5 h-5" /> },
  { id: 'remote-work', label: 'Remote Work', icon: <Home className="w-5 h-5" /> },
  { id: 'mind-mapping', label: 'Mind Mapping', icon: <Network className="w-5 h-5" /> },
  { id: 'spreadsheet', label: 'Spreadsheet Tools', icon: <Table className="w-5 h-5" /> },
  { id: 'encrypted-apps', label: 'Encrypted Apps', icon: <Lock className="w-5 h-5" /> },
  { id: 'no-code', label: 'No Code Apps', icon: <Wrench className="w-5 h-5" /> },
  { id: 'form-building', label: 'Form Building Tools', icon: <FileText className="w-5 h-5" /> },
  { id: 'team-knowledge', label: 'Team Knowledge', icon: <UsersRound className="w-5 h-5" /> },
  { id: 'whiteboard', label: 'Whiteboard Apps', icon: <Palette className="w-5 h-5" /> },
  { id: 'mindful', label: 'Mindful Apps', icon: <Flower2 className="w-5 h-5" /> },
  { id: 'document-editing', label: 'Document Editing', icon: <FileEdit className="w-5 h-5" /> },
  { id: 'gantt-charts', label: 'Gantt Charts', icon: <GanttChart className="w-5 h-5" /> },
  { id: 'agile-tools', label: 'Agile Tools', icon: <Repeat className="w-5 h-5" /> },
  { id: 'file-management', label: 'File Management', icon: <FolderOpen className="w-5 h-5" /> },
  { id: 'password-managers', label: 'Password Managers', icon: <Key className="w-5 h-5" /> },
  { id: 'focus-apps', label: 'Focus Apps', icon: <Focus className="w-5 h-5" /> },
  { id: 'journaling', label: 'Journaling', icon: <BookType className="w-5 h-5" /> },
  { id: 'gtd-tools', label: 'GTD Tools', icon: <CheckCircle className="w-5 h-5" /> },
  { id: 'writing-tools', label: 'Writing Tools', icon: <PenTool className="w-5 h-5" /> },
  { id: 'time-tracking', label: 'Time Tracking', icon: <Timer className="w-5 h-5" /> },
  { id: 'team-communication', label: 'Team Communication', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'shared-inbox', label: 'Shared Inbox', icon: <Inbox className="w-5 h-5" /> },
  { id: 'free-task-apps', label: 'Free Task Apps', icon: <Gift className="w-5 h-5" /> },
];

const platforms: FilterOption[] = [
  { id: 'all', label: 'All Platforms', icon: <Monitor className="w-5 h-5" /> },
  { id: 'web', label: 'Web', icon: <Globe className="w-5 h-5" /> },
  { id: 'ios', label: 'iOS', icon: <Apple className="w-5 h-5" /> },
  { id: 'android', label: 'Android', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'chrome', label: 'Chrome Extension', icon: <Plug className="w-5 h-5" /> },
  { id: 'linux', label: 'Linux', icon: <Terminal className="w-5 h-5" /> },
  { id: 'windows', label: 'Windows', icon: <MonitorCheck className="w-5 h-5" /> },
  { id: 'mac', label: 'Mac', icon: <Command className="w-5 h-5" /> },
];

const roles: FilterOption[] = [
  { id: 'all', label: 'All Roles', icon: <UserRound className="w-5 h-5" /> },
  { id: 'manager', label: 'Manager', icon: <UserCog className="w-5 h-5" /> },
  { id: 'freelancer', label: 'Freelancer', icon: <Rocket className="w-5 h-5" /> },
  { id: 'developer', label: 'Developer', icon: <Code className="w-5 h-5" /> },
  { id: 'operations', label: 'Operations', icon: <Settings className="w-5 h-5" /> },
  { id: 'student', label: 'Student', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'designer', label: 'Designer', icon: <Paintbrush className="w-5 h-5" /> },
  { id: 'entrepreneur', label: 'Entrepreneur', icon: <Lightbulb className="w-5 h-5" /> },
];

const userTypes: FilterOption[] = [
  { id: 'all', label: 'All User Types', icon: <Users className="w-5 h-5" /> },
  { id: 'individual', label: 'Individual', icon: <UserRound className="w-5 h-5" /> },
  { id: 'small-business', label: 'Small Business', icon: <Building2 className="w-5 h-5" /> },
  { id: 'mid-market', label: 'Mid Market', icon: <Building2 className="w-5 h-5" /> },
  { id: 'enterprise', label: 'Enterprise', icon: <Building2 className="w-5 h-5" /> },
];

const deployments: FilterOption[] = [
  { id: 'all', label: 'All Deployments', icon: <Rocket className="w-5 h-5" /> },
  { id: 'cloud', label: 'Cloud', icon: <Cloud className="w-5 h-5" /> },
  { id: 'hybrid', label: 'Hybrid', icon: <RefreshCw className="w-5 h-5" /> },
  { id: 'on-premise', label: 'On Premise', icon: <Building2 className="w-5 h-5" /> },
];

const industries: FilterOption[] = [
  { id: 'all', label: 'All Industries', icon: <Factory className="w-5 h-5" /> },
  { id: 'marketing', label: 'Marketing', icon: <LineChart className="w-5 h-5" /> },
  { id: 'development', label: 'Development', icon: <Code className="w-5 h-5" /> },
  { id: 'sales', label: 'Sales', icon: <DollarSign className="w-5 h-5" /> },
  { id: 'startups', label: 'Startups', icon: <Rocket className="w-5 h-5" /> },
  { id: 'consulting', label: 'Consulting', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'education', label: 'Education', icon: <School className="w-5 h-5" /> },
];

const customizability: FilterOption[] = [
  { id: 'all', label: 'Customizability', icon: <ToolIcon className="w-5 h-5" /> },
  { id: 'high', label: 'High', icon: <Star className="w-5 h-5 text-amber-400" /> },
  { id: 'medium', label: 'Medium', icon: <Star className="w-5 h-5 text-amber-400/70" /> },
  { id: 'low', label: 'Low', icon: <Star className="w-5 h-5 text-amber-400/40" /> },
];

const pricing: FilterOption[] = [
  { id: 'all', label: 'All Pricing', icon: <Coins className="w-5 h-5" /> },
  { id: 'free', label: 'Free', icon: <Gift className="w-5 h-5" /> },
  { id: 'one-time', label: 'One Time', icon: <DollarSign className="w-5 h-5" /> },
  { id: 'subscription', label: 'Subscription', icon: <RefreshCw className="w-5 h-5" /> },
];

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
    transition: background-color 0.2s;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: #E5E7EB;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #D1D5DB;
  }
  
  /* For Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  .custom-scrollbar:hover {
    scrollbar-color: #E5E7EB transparent;
  }
` as const;

const StyleTag = () => (
  <style>{customScrollbarStyles}</style>
);

interface FilterBarProps {
  tools: Tool[];
  onSearch: (filteredTools: Tool[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
  selectedUserTypes: string[];
  setSelectedUserTypes: (types: string[]) => void;
  selectedDeployments: string[];
  setSelectedDeployments: (deployments: string[]) => void;
  selectedIndustries: string[];
  setSelectedIndustries: (industries: string[]) => void;
  selectedCustomizability: string[];
  setSelectedCustomizability: (customizability: string[]) => void;
  selectedPricing: string[];
  setSelectedPricing: (pricing: string[]) => void;
  view: 'popular' | 'new';
  setView: (view: 'popular' | 'new') => void;
}

const FilterBar = ({ tools, onSearch, selectedCategories, setSelectedCategories, selectedPlatforms, setSelectedPlatforms, selectedRoles, setSelectedRoles, selectedUserTypes, setSelectedUserTypes, selectedDeployments, setSelectedDeployments, selectedIndustries, setSelectedIndustries, selectedCustomizability, setSelectedCustomizability, selectedPricing, setSelectedPricing, view, setView }: FilterBarProps) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if scroll buttons should be shown
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      // Check on window resize
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      const newScrollLeft = containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Search and filter function
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      onSearch(tools);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filteredTools = tools.filter(tool => {
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

    onSearch(filteredTools);
  };

  const SelectWrapper: React.FC<{
    options: FilterOption[];
    value: string[];
    onChange: (value: string[]) => void;
    defaultLabel: string;
  }> = ({ options, value, onChange, defaultLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const handleOptionClick = (optionId: string) => {
        if (optionId === 'all') {
            onChange([]);
        } else {
            const newValue = value.includes(optionId)
                ? value.filter(id => id !== optionId)
                : [...value, optionId];
            onChange(newValue);
        }
        setIsOpen(false);
    };

    const getButtonLabel = () => {
        if (value.length === 0) return defaultLabel;
        if (value.length === 1) {
            const option = options.find(opt => opt.id === value[0]);
            return option?.label || defaultLabel;
        }
        return `${value.length} Selected`;
    };

    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            updateDropdownPosition();
            window.addEventListener('resize', updateDropdownPosition);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-2 
                    bg-white/80 backdrop-blur-sm border rounded-lg 
                    text-sm font-medium text-gray-700 
                    hover:border-emerald-200 hover:text-emerald-600 
                    transition-all duration-200
                    ${isOpen ? 'border-emerald-200 text-emerald-600' : 'border-gray-200'}
                `}
            >
                <span className="flex items-center gap-2">
                    <span className="text-lg">{options[0].icon}</span>
                    <span>{getButtonLabel()}</span>
                </span>
                <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <Portal>
                    <>
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[997]"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Dropdown */}
                        <div 
                            ref={dropdownRef}
                            className="fixed z-[998] min-w-[240px] bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '320px',
                                maxHeight: '85vh'
                            }}
                        >
                            {/* Header */}
                            <div className="px-3 py-2 border-b border-gray-100">
                                <h3 className="font-medium text-gray-900">{defaultLabel}</h3>
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-2 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(85vh - 45px)' }}>
                                <div className="space-y-0.5">
                                    {options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleOptionClick(option.id)}
                                            className={`
                                                flex items-center w-full gap-3 px-3 py-2.5 
                                                text-sm rounded-lg transition-all duration-200
                                                ${value.includes(option.id)
                                                    ? 'bg-emerald-50 text-emerald-600 font-medium'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                                }
                                            `}
                                        >
                                            <span className="text-lg flex-shrink-0">{option.icon}</span>
                                            <span className="flex-1 text-left truncate">
                                                {option.id === 'all' ? defaultLabel : option.label}
                                            </span>
                                            {value.includes(option.id) && (
                                                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                </Portal>
            )}
        </div>
    );
  };

  if (!mounted) {
    return null; // Return null on server-side and first client render
  }

  return (
    <div className="sticky top-0 z-[40] w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-200">
      {mounted && createPortal(<StyleTag />, document.head)}
      
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
          {/* Left scroll button */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute -left-3 z-20 p-1.5 bg-white/90 backdrop-blur-sm shadow-lg rounded-full hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 border border-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={containerRef}
            className="flex items-center gap-3 overflow-x-auto custom-scrollbar scroll-smooth px-8 py-2"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
            }}
            onScroll={checkScroll}
          >
            {/* Search Box */}
            <div className="relative min-w-[240px] flex-shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm placeholder:text-gray-400 transition-all hover:border-emerald-200 hover:bg-white"
                placeholder="Search tools by name, category, platform..."
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-50/50 rounded-lg p-0.5 flex-shrink-0 border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              <button
                onClick={() => setView('popular')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  view === 'popular'
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Flame className="w-4 h-4" />
                Popular
              </button>
              <button
                onClick={() => setView('new')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  view === 'new'
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                New
              </button>
            </div>

            <div className="h-6 w-px bg-gray-200/70 flex-shrink-0" />

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <SelectWrapper
                options={categories}
                value={selectedCategories}
                onChange={setSelectedCategories}
                defaultLabel="Categories"
              />
              <SelectWrapper
                options={pricing}
                value={selectedPricing}
                onChange={setSelectedPricing}
                defaultLabel="Pricing"
              />
              <SelectWrapper
                options={platforms}
                value={selectedPlatforms}
                onChange={setSelectedPlatforms}
                defaultLabel="Platforms"
              />
              <SelectWrapper
                options={roles}
                value={selectedRoles}
                onChange={setSelectedRoles}
                defaultLabel="Roles"
              />
              <SelectWrapper
                options={userTypes}
                value={selectedUserTypes}
                onChange={setSelectedUserTypes}
                defaultLabel="User Types"
              />
              <SelectWrapper
                options={deployments}
                value={selectedDeployments}
                onChange={setSelectedDeployments}
                defaultLabel="Deployments"
              />
              <SelectWrapper
                options={industries}
                value={selectedIndustries}
                onChange={setSelectedIndustries}
                defaultLabel="Industries"
              />
              <SelectWrapper
                options={customizability}
                value={selectedCustomizability}
                onChange={setSelectedCustomizability}
                defaultLabel="Customizability"
              />
            </div>
          </div>

          {/* Right scroll button */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute -right-3 z-20 p-1.5 bg-white/90 backdrop-blur-sm shadow-lg rounded-full hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 border border-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <StyleTag />
      {children}
    </>,
    document.body
  );
};

export default FilterBar; 