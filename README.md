<div align="center">

<br />

# ⚡ Helplytics — Frontend

**A modern helpdesk & analytics platform built with Next.js 16, React 19, and Redux Toolkit.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

<br />

</div>

---

## 📌 Overview

Helplytics is a full-featured **helpdesk and analytics platform** frontend. It includes role-based authentication, a feature-rich dashboard, an AI Center, leaderboard, explore page, and real-time notifications — all wrapped in a smooth, animated UI built with Framer Motion.

---

## ✨ Features

- 🔐 **Authentication** — Login, Signup, and cookie-based session management
- 🛡️ **Route Protection** — Middleware-based auth guard for all private routes
- 📊 **Dashboard** — Central hub for analytics and user activity
- 🤖 **AI Center** — Dedicated section for AI-powered features
- 💬 **Messages** — Built-in messaging interface
- 🧭 **Explore** — Discover requests and activity across the platform
- 📋 **Requests** — Create and manage helpdesk requests
- 🏆 **Leaderboard** — User engagement and rankings
- 🔔 **Notifications** — Real-time notification center
- 👤 **Profile & Onboarding** — User setup and profile management
- 🎞️ **Smooth Animations** — Framer Motion powered transitions

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.4 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **State Management** | Redux Toolkit 2 + React-Redux |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion 12 |
| **HTTP Client** | Axios |
| **Auth** | Cookie-based (cookies-next) |
| **Icons** | Lucide React |
| **Notifications** | React Toastify |

---

## 📁 Project Structure

```
Helplytics-Frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   ├── messages/
│   ├── ai-center/
│   ├── leaderboard/
│   ├── notifications/
│   ├── create-request/
│   ├── explore/
│   ├── requests/
│   ├── onboarding/
│   ├── profile/
│   └── layout.tsx
├── redux/
│   ├── store.ts
│   ├── reducers/
│   └── actions/
├── public/
├── proxy.ts              # Next.js middleware for auth protection
├── clientLayout.tsx      # Client-side layout wrapper
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/syedmuhammadali-dev/Helplytics-Frontend.git

# 2. Navigate into the project
cd Helplytics-Frontend

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Add any other required environment variables
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint check
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Route Protection

The middleware (`proxy.ts`) automatically handles authentication:

| Route | Access |
|-------|--------|
| `/dashboard`, `/profile`, `/messages` | 🔒 Protected — requires auth token |
| `/ai-center`, `/leaderboard`, `/notifications` | 🔒 Protected — requires auth token |
| `/create-request`, `/explore`, `/requests`, `/onboarding` | 🔒 Protected — requires auth token |
| `/login`, `/signup` | 🌐 Public — redirects if already logged in |

---

## 📬 API Reference

A Postman collection is included for exploring backend endpoints:

```
saylani-backend-apis.postman_collection.json
```

Import this file into [Postman](https://www.postman.com/) to test all available API routes.

---

## 🔗 Related Repositories

> *(Add backend repo link here when available)*

---

## 👨‍💻 Author

**Syed Muhammad Ali** — MERN Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/syed-muhammed-ali-18669b2a1/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-black?style=flat-square&logo=vercel)](https://ali-portfolio-nine.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-gray?style=flat-square&logo=github)](https://github.com/syedmuhammadali-dev)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
