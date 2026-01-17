# React TypeScript Project

A modern React application built with TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible UI components
- **Sanity CMS** integration (optional)
- **ESLint + Prettier** for code quality and formatting
- **pnpm** for efficient package management

## 📦 Tech Stack

- Frontend: React 18 + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS + PostCSS
- UI Components: shadcn/ui (Radix UI based)
- Content Management: Sanity CMS
- Package Manager: pnpm
- Linting: ESLint + Prettier

## 🛠️ Development

### Prerequisites

- Node.js 18.x or 20.x
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
├── lib/                # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Styling

This project uses Tailwind CSS with a custom design system. The color palette and design tokens are configured in:

- `tailwind.config.cjs` - Tailwind configuration
- `src/index.css` - CSS custom properties for the design system

## 📝 Adding Components

To add new shadcn/ui components, you can manually copy them from the [shadcn/ui documentation](https://ui.shadcn.com) into the `src/components/ui/` directory.

## 🔧 Configuration Files

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration
- `tailwind.config.cjs` - Tailwind CSS configuration
- `postcss.config.cjs` - PostCSS configuration
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `sanity.config.ts` - Sanity CMS configuration

## 📱 Responsive Design

The project is built with mobile-first responsive design using Tailwind CSS breakpoints:

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

## 🌐 Deployment

Build the project for production:

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.