const PrivacyPolicyPage = () => {
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
              Privacy Policy
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Matters</h2>
              <p className="text-gray-600">
                At Find Next AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
              </p>
            </div>

            {/* Privacy Sections */}
            {[
              {
                title: "1. Information We Collect",
                content: "We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide. We also automatically collect certain information about your device when you use our services."
              },
              {
                title: "2. How We Use Your Information",
                content: "We use the information we collect to provide and improve our services, communicate with you, and enhance your experience on Find Next AI. This includes personalizing content and sending you updates about our services."
              },
              {
                title: "3. Information Sharing",
                content: "We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users."
              },
              {
                title: "4. Cookies and Tracking",
                content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
              },
              {
                title: "5. Data Security",
                content: "We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet is 100% secure."
              },
              {
                title: "6. Your Rights",
                content: "You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your information. Contact us to exercise these rights."
              },
              {
                title: "7. Third-Party Links",
                content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites."
              },
              {
                title: "8. Children's Privacy",
                content: "Our services are not intended for children under 13. We do not knowingly collect or maintain information from children under 13."
              }
            ].map((section) => (
              <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}

            {/* GDPR Notice */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">GDPR Compliance</h2>
              <p className="text-gray-600">
                For users in the European Union, we comply with GDPR requirements regarding the collection and processing of personal data. You have the right to request access to, rectification, or erasure of your personal data.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Questions?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about our Privacy Policy or how we handle your information, please contact us.
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

export default PrivacyPolicyPage; 