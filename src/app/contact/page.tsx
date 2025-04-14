import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
          </div>
          <div className="relative space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-emerald-800">Contact</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Reach the Team
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-12 max-w-3xl">
          <div className="prose prose-lg">
            <p className="text-lg text-gray-600">
              <span className="font-medium text-gray-900">Find Next AI</span> prides itself of being the hub for productivity software. Helping people find the most suitable tool for their personal or work productivity. Find Next AI is a creation of the Keep Productive team, with over{' '}
              <span className="font-medium text-gray-900">10 years</span> of history finding and matching people with the best productivity tools for their work and lifestyle.
            </p>
          </div>

          {/* Contact Guidelines */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Before you contact, please note the following:
            </h2>
            <ul className="mt-8 space-y-6">
              {[
                'We review all productivity tool without bias.',
                'Our objective is to be informative and provide an approachable review.',
                'We currently do not accept new tool submissions on Find Next AI.',
                'If the provider has an affiliate, we will include within the tool page, but this does not interfere with our placement or review.'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <p className="ml-4 text-lg text-gray-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsorship Section */}
          <div className="mt-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Looking to become a sponsor?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Sponsorship applications are an exciting opportunity to expand reach and grow your user base with a focused display ads, newsletter & search campaign.
            </p>
            <div className="mt-8">
              <Link 
                href="mailto:contact@findnextai.com" 
                className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 group"
              >
                <span>Get in touch</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
            <p className="mt-4 text-lg text-gray-600">
              Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter your message"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 