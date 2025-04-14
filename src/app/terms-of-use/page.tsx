const TermsOfUsePage = () => {
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
              <span className="text-sm font-medium text-emerald-800">Legal</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="prose prose-lg prose-emerald">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Find Next AI</h2>
              <p className="text-gray-600">
                By accessing and using Find Next AI, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </div>

            {/* Terms Sections */}
            {[
              {
                title: "1. Acceptance of Terms",
                content: "By accessing and using Find Next AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our service."
              },
              {
                title: "2. Description of Service",
                content: "Find Next AI provides a platform for discovering and comparing productivity tools and software. We offer reviews, comparisons, and recommendations based on our expertise and research."
              },
              {
                title: "3. User Conduct",
                content: "You agree to use Find Next AI only for lawful purposes and in a way that does not infringe upon the rights of others. Any misuse of our service may result in termination of your access."
              },
              {
                title: "4. Content and Reviews",
                content: "Our reviews and recommendations are based on our professional judgment and experience. While we strive for accuracy, we make no guarantees about the completeness or reliability of any information provided."
              },
              {
                title: "5. Intellectual Property",
                content: "All content on Find Next AI, including text, graphics, logos, and software, is the property of Find Next AI and is protected by intellectual property laws."
              },
              {
                title: "6. Third-Party Links",
                content: "Find Next AI may contain links to third-party websites. We are not responsible for the content or practices of these sites and encourage you to review their individual terms and policies."
              },
              {
                title: "7. Affiliate Relationships",
                content: "We may have affiliate relationships with some of the tools we review. This does not affect our review process or recommendations, but may result in compensation if you purchase through our links."
              },
              {
                title: "8. Modifications",
                content: "We reserve the right to modify these terms at any time. Continued use of Find Next AI after changes constitutes acceptance of the modified terms."
              }
            ].map((section) => (
              <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About the Terms?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Use, please contact us.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 group"
              >
                <span>Contact Us</span>
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage; 