# Task Tracker Application

A beautiful and responsive task management application built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Modern and intuitive UI design
- 🌓 Dark mode support
- 📱 Fully responsive layout
- 🔒 Authentication system
- 🔄 Real-time task updates
- 🗃️ Local storage persistence
- 🎯 Task filtering (All, Pending, Completed)
- ⚡ Fast and smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Demo Credentials

- Email: demo@example.com
- Password: demo123

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Router
- React Hot Toast
- Lucide React (Icons)

## Project Structure

```
src/
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── store/          # State management
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Design Approach

The UI/UX design focuses on:
- Clean and minimalist interface
- Intuitive task management
- Smooth transitions and animations
- Consistent visual hierarchy
- Accessible color schemes
- Responsive layout for all devices

## State Management Strategy

We use Zustand for state management because:
- Simple and lightweight
- Built-in persistence
- TypeScript support
- Minimal boilerplate
- Easy integration with React

## Challenges and Solutions

1. **API Integration**
   - Challenge: Handling API errors and loading states
   - Solution: Implemented comprehensive error handling and loading indicators

2. **Responsive Design**
   - Challenge: Consistent layout across devices
   - Solution: Utilized Tailwind CSS breakpoints and flexible grid system

3. **Dark Mode**
   - Challenge: Smooth theme transitions
   - Solution: Implemented system-based theme detection and persistent theme preference

## License

This project is licensed under the MIT License - see the LICENSE file for details.