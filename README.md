# User Registration Frontend

React + TypeScript frontend for user registration and authentication with modern UI components.

## Features

- ✅ User registration and login forms
- ✅ JWT authentication with automatic token refresh
- ✅ Protected routes with AuthGuard
- ✅ Modern UI with shadcn/ui components
- ✅ Form validation with Zod
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time authentication status

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment setup:**
   Create `.env` file:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Forms:** react-hook-form + Zod validation
- **HTTP Client:** TanStack Query
- **Routing:** React Router

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── hooks/
│   └── useAuth.ts    # Authentication hooks
├── lib/
│   ├── api.ts        # API client
│   └── validations.ts # Form schemas
├── pages/
│   ├── Home.tsx      # Dashboard page
│   ├── Login.tsx     # Login form
│   └── Register.tsx  # Registration form
├── services/
│   └── auth.ts       # Auth service
└── types/
    └── auth.ts       # Type definitions
```
