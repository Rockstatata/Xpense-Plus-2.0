# Xpense+ — Quantify Your Life

**Xpense+** is a cross-platform personal finance tracker designed to be minimalist, intuitive, and lightning-fast. Built with **React Native (Expo)** and powered by a **Node.js + PostgreSQL backend**, this app is optimized for daily use and offline-first capability. Whether you're tracking groceries, rent, or travel, Xpense+ makes it frictionless.

---

## 🔧 Tech Stack

| Layer          | Technology                                                   |
| -------------- | ------------------------------------------------------------ |
| Frontend       | React Native (Expo), Tailwind (NativeWind), React Navigation |
| Local Storage  | MMKV or AsyncStorage                                         |
| Backend        | Express.js (Node.js), PostgreSQL (Neon)                      |
| Authentication | Clerk (Email OTP flow)                                       |
| Sync Engine    | Redis + Custom Logic                                         |
| Charts         | react-native-chart-kit / victory-native                      |
| DevOps         | EAS (Expo), Render/Vercel, GitHub CI/CD                      |

---

## 🔐 Key Features

### 🔑 Authentication

- Clerk-based email OTP verification
- 6-digit secure code input flow
- Full login/signup/logout experience

### 💸 Expense Tracker

- Add income or expense with a quick-entry form
- Category tagging (Food, Bills, Travel, etc.)
- Swipe to delete or long-press for edit (optional)
- Live balance update on the dashboard

### 📊 Financial Insights

- Category-wise pie charts
- Monthly bar chart of spending/income
- Budget limit tracking with visual indicators
- Savings goal tracker with timeline

### 🛡️ Offline First + Sync

- Stores data locally via `mmkv`
- Detects network status and syncs automatically
- Conflict-free: timestamps used for merges
- Manual sync button + background sync on app focus

### 🛋️ Handshake Feature (Optional)

- P2P transaction confirmation (e.g. bill split)
- Invite via code or QR
- Status: pending → confirmed/denied

### ✨ UI/UX

- Modern, minimal design
- Light/Dark mode
- Pull to refresh
- FAB (Floating Action Button)

---

## 📆 Roadmap

### Phase 1: MVP

- [x] Auth (Clerk)
- [x] Add/delete transactions
- [x] Balance calculator
- [x] Hosted backend API

### Phase 2: Advanced Features

- [x] Offline storage & sync
- [x] Category pie charts
- [x] Budget + savings tracker

### Phase 3: Handshake + Polish

- [ ] Peer-to-peer feature
- [ ] Push notifications (bill alert, reminders)
- [ ] Play Store deployment

---

## ⚡ Installation (Frontend)

### Prerequisites:

- Node.js (>= 18.x)
- Expo CLI (`npm install -g expo-cli`)
- Git

### Steps:

```bash
git clone https://github.com/yourusername/xpense-plus.git
cd xpense-plus
npm install
npx expo start
```

You can run on a real device via **Expo Go** or use **Android Studio Emulator**.

---

## 🤖 Installation (Backend)

### Prerequisites:

- Node.js
- PostgreSQL (Neon or local)
- Redis (optional, for rate limiting)

```bash
cd backend
npm install
cp .env.example .env  # Add DB credentials, Clerk keys, etc.
npm run dev
```

Server will run at `http://localhost:5000`.

---

## 📂 Environment Variables

```env
# Frontend (.env)
EXPO_PUBLIC_API_URL=https://your-backend-url.com
CLERK_PUBLISHABLE_KEY=pk_test_...

# Backend (.env)
PORT=5000
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
REDIS_URL=redis://localhost:6379
```

---

## 🏠 Folder Structure

```bash
/xpense-plus
├── /assets
├── /components       # Reusable UI components
├── /screens          # App screens (Home, Add, Login, etc.)
├── /services         # API, storage, sync logic
├── /hooks            # Custom React hooks
├── /utils            # Formatters, constants
├── app.config.js     # Expo app config
├── App.tsx           # App entry point
└── .env              # Environment secrets
```

---

## 🌍 Deployment Guide

### Mobile App:

- Use `EAS Build`

```bash
npx expo install eas-cli
npx eas build -p android --profile production
```

- Upload generated `.aab` to Google Play Console

### Backend:

- Deploy via **Render**, **Railway**, or **Vercel (Serverless)**
- Secure environment variables
- Setup Clerk Webhook (if needed for syncing users)

---

## ⚖️ License

MIT License. Feel free to fork, clone, improve or commercialize.

---

## ✉️ Feedback & Contributions

Feel free to open issues, pull requests or start discussions.
This app was built for **practical daily use**, and your suggestions are welcome to make it even better!

---

## 🚀 Summary

> **Xpense+** is not just an academic project. It's a real-life financial companion designed to be fast, offline-capable, and user-friendly for your day-to-day financial discipline. It's built with ❤️ and with a strong focus on productivity and simplicity.

Stay tuned for v1.0 on the Play Store!
