# DASH - Interactive Code Editor with AI Integration

A powerful web-based development environment that combines real-time code editing with AI assistance, built with Next.js, React, and WebContainer API.

![DASH Screenshot](https://your-screenshot-url.png)

## 🌟 Features

- **Live Code Editor**: Built with Monaco Editor for a VS Code-like experience
- **Real-time Preview**: Instant preview of your React applications
- **AI Integration**: Powered by Pollinations AI for intelligent code suggestions
- **WebContainer Integration**: Run Node.js applications directly in the browser
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Dark/Light Mode**: Full theme support with system preference detection

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amardeeplakshkar/DASH.git
cd DASH
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Runtime**: [WebContainer API](https://webcontainers.io/)
- **AI Integration**: [Pollinations React](https://pollinations.ai/)

## 📁 Project Structure

```
DASH/
├── app/                  # Next.js app directory
│   ├── (routes)/        # Application routes
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ui/             # UI components
│   └── context/        # React context providers
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🎯 Key Components

- **ChatComponent**: AI-powered chat interface for code generation
- **SdkComponent**: WebContainer-based code editor and preview
- **FileGroupContext**: Manages file state across components
- **ThemeProvider**: Handles application theming

## 🔧 Configuration

The project includes several configuration files:

- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `postcss.config.mjs`: PostCSS configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [WebContainer](https://webcontainers.io/) team for the browser-based runtime

## 📞 Contact

Your Name - [@AmardeepDevs](https://twitter.com/AmardeepDevs)

Project Link: [https://github.com/amardeeplakshkar/DASH](https://github.com/amardeeplakshkar/DASH)
