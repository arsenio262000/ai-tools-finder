import Image from 'next/image';

const logos = [
  {
    src: '/notion.png',
    alt: 'Notion',
    position: 'left-20 top-32 -rotate-12',
    animation: 'animate-float-slow'
  },
  {
    src: '/logos/cursor-ai.png',
    alt: 'Cursor AI',
    position: 'right-48 top-24 rotate-12',
    animation: 'animate-float-slower'
  },
  {
    src: '/slack.png',
    alt: 'Slack',
    position: 'left-[25%] top-1 rotate-6',
    animation: 'animate-float'
  },
  {
    src: '/logos/intercom.png',
    alt: 'Intercom',
    position: 'right-1/4 top-20 -rotate-12',
    animation: 'animate-float-slow'
  },
  {
    src: '/zapier.png',
    alt: 'Zapier',
    position: 'left-[20%] top-[25%] -translate-y-[140px] rotate-0',
    animation: 'animate-float'
  },
  {
    src: '/logos/sketch.png',
    alt: 'Sketch',
    position: 'right-1/2 top-4 -rotate-45',
    animation: 'animate-float-slower'
  },
  {
    src: '/monday.png',
    alt: 'Monday',
    position: 'left-[10%] bottom-32 rotate-12',
    animation: 'animate-float-slow'
  },
  {
    src: '/logos/vercel.png',
    alt: 'Vercel',
    position: 'right-[10%] bottom-24 -rotate-6',
    animation: 'animate-float'
  },
  {
    src: '/logos/gitlab.png',
    alt: 'GitLab',
    position: 'left-[25%] bottom-16 rotate-45',
    animation: 'animate-float-slower'
  },
  {
    src: '/logos/buffer.png',
    alt: 'Buffer',
    position: 'right-[20%] bottom-48 -rotate-12',
    animation: 'animate-float-slow'
  }
];

export const FloatingLogos = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {logos.map((logo) => (
        <div
          key={logo.alt}
          className={`absolute ${logo.position} ${logo.animation} transform`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-3">
            <div className="relative w-full h-full">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 64px, 80px"
                priority
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 