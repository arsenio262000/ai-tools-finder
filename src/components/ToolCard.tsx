import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, CheckCircle, ArrowRight, Tag } from 'lucide-react';
import { useSavedTools } from '@/hooks/useSavedTools';
import { Tool } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolCardProps {
    tool: Tool;
    isSaved: boolean;
    onSave: () => void;
}

const categoryColors: { [key: string]: string } = {
    'todo-list': 'blue',
    'daily-planners': 'purple',
    'note-taking': 'emerald',
    'project-management': 'indigo',
    'team-knowledge': 'rose',
    'pkm-apps': 'amber',
    'document-editing': 'cyan',
    'team-communication': 'violet',
    'email': 'orange',
    'all-in-one': 'teal',
    default: 'gray'
};

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const gradients = [
    'from-blue-500 to-purple-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-pink-500',
    'from-indigo-500 to-cyan-500',
    'from-rose-500 to-orange-500',
    'from-violet-500 to-fuchsia-500',
];

const getGradient = (name: string) => {
    // Use the sum of character codes to deterministically select a gradient
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[sum % gradients.length];
};

const ImageWithFallback = ({ tool }: { tool: Tool }) => {
    const [error, setError] = useState(false);
    const initials = getInitials(tool.name);
    const gradient = getGradient(tool.name);

    if (error) {
        return (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                <span className="text-lg font-semibold text-white">{initials}</span>
            </div>
        );
    }

    return (
        <>
            <Image
                src={tool.logo}
                alt={tool.name}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                onError={() => setError(true)}
            />
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transform" />
        </>
    );
};

const getCategoryColor = (category: string) => {
    const color = categoryColors[category] || categoryColors.default;
    return {
        background: `bg-${color}-50/80`,
        border: `border-${color}-100/50`,
        text: `text-${color}-600`,
        hover: `hover:bg-${color}-100/80 hover:border-${color}-200/50`,
    };
};

export function ToolCard({ tool, isSaved, onSave }: ToolCardProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLocalSaved, setIsLocalSaved] = useState(isSaved);

    // Update local state when prop changes
    useEffect(() => {
        setIsLocalSaved(isSaved);
    }, [isSaved]);

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            await onSave();
            setIsLocalSaved(!isLocalSaved); // Toggle local state
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div
            className="relative bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100/50 p-6 group transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                boxShadow: isHovered 
                    ? '0 20px 40px -15px rgba(0,0,0,0.1), 0 0 20px 0 rgba(0,0,0,0.03), inset 0 0 0 1px rgba(255,255,255,0.15)' 
                    : '0 4px 6px -1px rgba(0,0,0,0.05), 0 0 10px 0 rgba(0,0,0,0.02)',
            }}
        >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />
            
            {/* Hover Corner Effect */}
            <motion.div 
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-bl-[100px]" />
            </motion.div>
            
            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <motion.div 
                            className="relative w-12 h-12 bg-white rounded-xl border border-gray-100/80 overflow-hidden shadow-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <ImageWithFallback tool={tool} />
                        </motion.div>
                        <div>
                            <motion.h3 
                                className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300"
                            >
                                {tool.name}
                            </motion.h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                {tool.categories.slice(0, 2).map((category, index) => {
                                    const colors = getCategoryColor(category);
                                    return (
                                        <motion.div
                                            key={`${tool.id}-${category}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={`/categories/${category}`}
                                                className={`
                                                    inline-flex items-center gap-1 px-2 py-0.5 
                                                    rounded-md text-xs font-medium
                                                    border backdrop-blur-sm transition-all duration-300
                                                    ${colors.background} ${colors.border} ${colors.text} ${colors.hover}
                                                `}
                                            >
                                                <Tag className="w-3 h-3" />
                                                <span>{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <motion.button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`relative p-2 rounded-xl transition-all duration-300 ${
                            isLocalSaved
                                ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                : 'hover:bg-gray-50 text-gray-400 hover:text-gray-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Bookmark className={`w-5 h-5 ${isLocalSaved ? 'fill-current' : ''}`} />
                        <AnimatePresence>
                            {isLocalSaved && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"
                                />
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                    {tool.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AnimatePresence>
                            {tool.isEditorChoice && (
                                <motion.div 
                                    className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/80 backdrop-blur-sm rounded-full text-xs text-emerald-600 border border-emerald-100/50"
                                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        delay: 0.2 
                                    }}
                                >
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Editor&apos;s Choice</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Link
                            href={`/tools/${tool.id}`}
                            className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-300 group/link"
                        >
                            <span>View Details</span>
                            <motion.div
                                className="p-1 rounded-full bg-emerald-50/0 group-hover/link:bg-emerald-50 transition-colors duration-300"
                                whileHover={{ x: 2 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
} 