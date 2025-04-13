# AI Tools Finder

A powerful platform for discovering, comparing, and managing AI tools and services. Built with Next.js, TypeScript, and modern web technologies.

## 🌟 Features

- **AI Tool Discovery**: Browse and search through a curated collection of AI tools
- **Smart Categorization**: Tools organized by categories and use cases
- **Detailed Comparisons**: Compare features, pricing, and capabilities
- **User Reviews & Ratings**: Real user feedback and ratings
- **Personal Collections**: Save and organize your favorite tools
- **Modern UI/UX**: Responsive design with dark/light mode support
- **Enterprise Ready**: Built with scalability and security in mind

## 📚 Documentation

- [Quick Start Guide](./docs/quick-start.md)
- [Installation Guide](./docs/installation.md)
- [Configuration Guide](./docs/configuration.md)
- [API Documentation](./docs/api.md)
- [User Guide](./docs/user-guide.md)

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-tools-finder.git
cd ai-tools-finder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: NestJS, MongoDB Atlas
- **Authentication**: Clerk
- **State Management**: React Query
- **Styling**: Tailwind CSS, Shadcn UI
- **Database**: MongoDB with Prisma ORM

## 📦 Project Structure

```
ai-tools-finder/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API and external services
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── prisma/           # Database schema and migrations
├── public/           # Static assets
└── docs/            # Documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [NestJS](https://nestjs.com/)
