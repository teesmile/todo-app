# Todo List Application

## 📌 Project Description
A feature-rich Todo List application built with **Next.js 15** and **TypeScript** that helps users organize their tasks efficiently. The app communicates with the DummyJSON API for todo operations and provides both local storage and API synchronization.

![App Screenshot](https://github.com/user-attachments/assets/dc32ceed-9cbc-472b-9da2-c06331ab6361)

## ✨ Key Features
- **Task Management**
  - Add new todos
  - View all todos with pagination
  - Mark todos as complete/incomplete
  - View todo details

- **Search & Filter**
  - Search todos by text content
  - Filter by status (All/Active/Completed)

- **Responsive Design**
  - Works on mobile, tablet, and desktop
  - Clean, intuitive interface

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Server-side rendering and client components
  - Tailwind CSS for styling

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/teesmile/todo-app.git
cd todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npm run type-check
```

## 🧩 Technology Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Frontend        | Next.js 15, React 19, TypeScript     |
| Routing         | Next.js App Router                    |
| Styling         | Tailwind CSS                          |
| Build Tool      | Next.js (Built-in)                   |
| Mock API        | [DummyJSON](https://dummyjson.com/docs/todos#todos-all) |
| Type Safety     | TypeScript, Zod for validation       |

### Architecture Decisions
- **Next.js App Router**: Modern routing with file-based structure
- **TypeScript**: Full type safety across the application  
- **Client-side filtering**: Better performance with local state
- **Server and Client Components**: Optimized rendering strategy
- **Local state management**: Immediate UI updates with API sync
- **Responsive-first design**: Mobile-optimized interface
- **Suspense boundaries**: Better loading states and error handling

## 📁 Project Structure

```
todo-app/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── todos/[id]/        # Dynamic todo detail routes
│       └── page.tsx       # Todo detail page
├── components/            # Reusable UI components
│   ├── ErrorBoundary.tsx  # Error boundary component
│   ├── Navbar.tsx         # Navigation component
│   ├── Pagination.tsx     # Pagination component
│   └── TodoItem.tsx       # Individual todo item
├── hooks/                 # Custom React hooks
│   └── useFetch.ts        # Data fetching hook
├── types/                 # TypeScript type definitions
│   └── todo.ts            # Todo-related types
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🖥️ Usage Guide

### 1. Browsing Todos
- Todos are paginated (10 per page by default)
- Use pagination controls at bottom to navigate
- URLs maintain state with query parameters

### 2. Searching & Filtering
- **Search:** Type in the search field to filter by text
- **Status Filter:**
  - `All`: Show all todos
  - `Active`: Only incomplete todos
  - `Completed`: Only finished todos
- Search params are preserved in the URL

### 3. Adding a Todo

1. Click the "+" button
2. Enter your task in the modal
3. Click "Add Todo"
4. The todo is added optimistically and synced with API

### 4. Viewing Todo Details

1. Click any todo item
2. View details on the dedicated page (`/todos/[id]`)
3. Toggle completion status with checkbox
4. Use back button to return to the list

**Note:** DummyJSON doesn't persist changes - added todos only exist in local state and will reset on page refresh.

## ⚠️ Known Limitations

- **API Persistence**: DummyJSON is a mock API - new todos don't persist between sessions
- **Network Dependent**: Requires internet connection for initial data fetch
- **Local Storage**: Todo state is stored locally for better UX
- No user accounts or authentication
- No offline capability
- Delete and Edit actions are placeholders (UI only)

## 🚀 Development Features

- **Hot Reload**: Instant feedback during development
- **TypeScript**: Compile-time error checking
- **ESLint**: Code quality enforcement
- **Tailwind CSS**: Utility-first styling approach
- **App Router**: File-based routing with layouts
- **Server Components**: Optimized rendering strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint` && `npm run type-check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
