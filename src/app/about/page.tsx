import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: "Arsen Serobian",
    role: "Founder & Content Creator",
    image: "/arsen.jpg",
    twitter: "",
    bio: "FindNextAI was created to make it easy for individuals and businesses to discover powerful, up-to-date AI tools. With a background in tech, media, and education, the goal is to bridge innovation with practical use."
  },
  {
    name: "Karl Hadwen",
    role: "Lead Developer",
    image: "/karl.jpg",
    twitter: "karlhadwen",
    bio: "As the lead developer at Find Next AI, Karl is responsible for bringing Find Next AI to life through his deep knowledge of programming."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section with decorative elements */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
          </div>
          <div className="relative space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-emerald-800">About Us</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
              Meet the Team
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re on a mission to help you discover the perfect tools for your workflow.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { label: 'Reviewed Tools', value: '450+' },
              { label: 'Monthly Visitors', value: '250,000+' },
              { label: 'Years of Experience', value: '10+' }
            ].map((stat) => (
              <div key={stat.label} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-sm transition hover:shadow-md group">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                  <dd className="mt-3 text-4xl font-semibold tracking-tight text-emerald-600">{stat.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Main Content */}
        <div className="mt-24 space-y-12 max-w-3xl mx-auto">
          <div className="prose prose-lg prose-emerald">
            <p className="text-lg leading-relaxed text-gray-600">
              Find Next AI is one of the leading sites to find software for both work & life.
            </p>

            <p className="text-lg leading-relaxed text-gray-600">
              We have over 450+ reviewed tools listed on Find Next AI, ranging from CRM tools to project management software. Our mission is to help people find the right software that matches your needs. Over 250,000+ people visit Find Next AI, and our reviews have been instrumental in their success... {' '}
              <Link href="https://youtube.com/toolfinder" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline decoration-2 underline-offset-2 transition-colors">
                YouTube
              </Link>{' '}
              channel to find the perfect tools for the job at hand.
            </p>

            <p className="text-lg leading-relaxed text-gray-600">
            Find Next AI is currently run by Arsen Serobian, the founder of the popular productivity software YouTube channel, Keep Productive, and Karl Hadwen, the development brains behind Find Next AI.
            </p>

            <p className="text-lg leading-relaxed text-gray-600">
              Built on a vision to help people optimize the tools they use daily, Find Next AI is one of the most innovative tool discovery sites out there and aiming to become the number one place for you to select and pick tools.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-gray-900 text-center">The faces behind Find Next AI</h2>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="absolute -bottom-6 left-6 right-6">
                    <div className="bg-white rounded-xl shadow-xl p-4 transform transition duration-300 group-hover:-translate-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-emerald-600 mt-0.5">{member.role}</p>
                        </div>
                        <a 
                          href={`https://twitter.com/${member.twitter}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center space-x-2 text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>
                      <p className="mt-3 text-gray-600">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 blur-3xl opacity-50"></div>
          </div>
          <div className="relative bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to find your perfect tools?</span>
                <span className="block mt-2 text-emerald-600">Start exploring today.</span>
              </h2>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 group"
                >
                  <span>Explore Tools</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 