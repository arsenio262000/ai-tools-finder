import Link from 'next/link';
import { 
  ClipboardList, 
  Calendar, 
  VideoIcon, 
  Users, 
  PenSquare, 
  Mail, 
  Brain,
  ExternalLink,
  Star
} from 'lucide-react';

interface FooterLinkItem {
  name: string;
  href: string;
  external?: boolean;
}

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-100">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Join our newsletter</h2>
            <p className="mt-4 text-base text-gray-600">
              Get the latest updates on new tools and in-depth comparisons delivered to your inbox.
            </p>
            <div className="mt-6">
              <form className="sm:flex justify-center">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full sm:max-w-xs px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter your email"
                />
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1 space-y-8">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-100">
                    <span className="text-white text-2xl font-bold">AI</span>
                  </div>
                  <div className="absolute -inset-0.5 bg-emerald-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                </div>
                <span className="ml-4 text-gray-900 font-semibold text-xl">Find Next AI</span>
              </Link>
              <p className="text-base leading-relaxed text-gray-600">
                On a mission to help you work smarter with the right tools. Helping you to choose the right tools for your job, your company & your needs with over 10+ years experience.
              </p>
              <div className="flex space-x-5">
                <a href="https://twitter.com/toolfinder" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-emerald-600 transition-colors p-2 hover:bg-emerald-50 rounded-full">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://youtube.com/toolfinder" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-emerald-600 transition-colors p-2 hover:bg-emerald-50 rounded-full">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div className="lg:ml-8">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
              <ul className="mt-6 space-y-4">
                {[
                  { name: 'About', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'Terms of Use', href: '/terms-of-use' },
                  { name: 'Privacy Policy', href: '/privacy-policy' }
                ].map((item: FooterLinkItem) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-base text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center group"
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors duration-200"></span>
                      {item.name}
                      {item.external && (
                        <svg 
                          className="ml-2 h-4 w-4 text-gray-400" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Reads */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Top Reads</h3>
              <ul className="mt-6 space-y-4">
                {[
                  { 
                    name: 'Best Project Management Tools', 
                    href: '/lists/project-management',
                    icon: <ClipboardList className="w-4 h-4 text-emerald-600" />
                  },
                  { 
                    name: 'Best AI Daily Planning Software', 
                    href: '/lists/ai-daily-planning',
                    icon: <Calendar className="w-4 h-4 text-emerald-600" />
                  },
                  { 
                    name: 'Best AI Meeting Tools', 
                    href: '/lists/ai-meeting-tools',
                    icon: <VideoIcon className="w-4 h-4 text-emerald-600" />
                  },
                  { 
                    name: 'Best CRM Software for Teams', 
                    href: '/lists/crm-software',
                    icon: <Users className="w-4 h-4 text-emerald-600" />
                  },
                  { 
                    name: 'Best AI Note-Taking Software', 
                    href: '/lists/ai-note-taking',
                    icon: <PenSquare className="w-4 h-4 text-emerald-600" />
                  },
                  { 
                    name: 'Best AI Email Management Tools', 
                    href: '/lists/ai-email-management',
                    icon: <Mail className="w-4 h-4 text-emerald-600" />
                  },
                  { 
                    name: 'Best Productivity Tools for ADHD', 
                    href: '/lists/productivity-adhd',
                    icon: <Brain className="w-4 h-4 text-emerald-600" />
                  }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-base text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center group"
                    >
                      <div className="mr-3 opacity-75 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sponsored Tool Card */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-6">Featured Tool</h3>
              <div className="bg-white rounded-xl border border-emerald-100 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Notion</h4>
                    <p className="text-sm text-emerald-600">Editor's Choice</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  All-in-one workspace for notes, docs, wikis, projects, and collaboration. Perfect for teams and individuals.
                </p>
                <Link 
                  href="/tools/notion-1" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 group/link"
                >
                  Learn More
                  <ExternalLink className="w-4 h-4 transform transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-base text-gray-500 text-center">
              © {new Date().getFullYear()} Find Next AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 