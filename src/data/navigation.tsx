import { BarChart3, Pencil, Calendar, Handshake, Briefcase, Mail, Target } from 'lucide-react';
import { ReactNode } from 'react';

export interface DropdownItem {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export const softwareCategories: DropdownItem[] = [
  {
    title: 'Best Project Management Tools',
    description: 'Discover the best tools for team collaboration & communication',
    href: '/lists/project-management',
    icon: <BarChart3 className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Best AI Note-Taking Software',
    description: 'Optimize your note-taking and personal knowledge management',
    href: '/lists/ai-notes',
    icon: <Pencil className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Best AI Daily Planning Software',
    description: 'Choose your priorities, organize your day and get more done',
    href: '/lists/ai-planning',
    icon: <Calendar className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Best AI Meeting Tools',
    description: 'Enhance your meetings and reduce administration tasks',
    href: '/lists/ai-meeting',
    icon: <Handshake className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Best CRM Software for Teams',
    description: 'Capture your leads, nurture your contacts & manage relationships',
    href: '/lists/crm',
    icon: <Briefcase className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Best AI Email Management Tools',
    description: 'Get through your inbox with ease and organize your communications',
    href: '/lists/ai-email',
    icon: <Mail className="w-5 h-5 text-gray-600" />
  },
  {
    title: 'Best Productivity Tools for ADHD',
    description: 'Work better with your ADHD with productivity tools',
    href: '/lists/adhd-tools',
    icon: <Target className="w-5 h-5 text-gray-600" />
  }
]; 