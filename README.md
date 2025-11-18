

🌸 Influenser Platform

Influenser Platform is a full-stack application designed for influencers to manage their profiles, publish content, and interact with potential partners.
This repository contains both the frontend (React + Vite + TypeScript) and an initial backend folder (to be expanded as the project evolves).

------------------------------------------------------------------
🚀 Tech Stack

Frontend

React 18
Vite
TypeScript
React Router (planned)
Redux Toolkit (planned)
Axios (planned)

Styling

Tailwind CSS v4
shadcn/ui
Radix UI Primitives (planned)

Tooling

ESLint (code quality)
Prettier (formatting)
npm (package manager)

------------------------------------------------------------------
Deployment

The frontend is currently being deployed via:

(https://influenser-platform.vercel.app/)

------------------------------------------------------------------

📁 Repository Structure

influenser-platform/
├─ backend/                     # Placeholder — backend will be added later
│
└─ frontend/                    # Main React app (Vite + TS)
   └─ src/
      ├─ app/                  # Root App, routing, global providers
      ├─ assets/               # Fonts, icons, images
      ├─ components/
      │  ├─ layout/            # Shared layout components
      │  └─ ui/                # shadcn UI components
      ├─ hooks/                # Reusable hooks
      ├─ lib/                  # Utils, helpers
      ├─ styles/               # Global styles
      ├─ types/                # Shared TypeScript types
      ├─ index.css             # Global CSS entry
      └─ main.tsx              # Vite entry point


🧭 Getting Started
------------------------------------------------------------------
1) Prerequisites:

Node.js 18+

npm (preferred package manager)

2) Installation

x Clone the repository and install dependencies:

git clone https://github.com/your-username/influenser-platform.git
cd influenser-platform/frontend
npm install

x Run locally:

npm run dev

x App will be available at:

http://localhost:5173

------------------------------------------------------------------

Build for production:

npm run build

Preview build:

npm run preview

------------------------------------------------------------------
🛠️ Development Guidelines

x Branching strategy - Feature branches should follow the format:

feature-[ticket-ref-number]/[ticket-title]

Examples: 

feature-123/profile-page, feature-87/add-login-endpoint

x Pushing of features to production will require a PR to be approved and all comments to be resolved.

------------------------------------------------------------------

Planned additions - As the application evolves, the following will be integrated:

x React Router for full routing

x Redux Toolkit for global state

x Axios-based API client

x Radix primitives for accessible UI behaviors


