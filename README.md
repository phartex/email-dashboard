# 📧 Email Dashboard App


A responsive and performant email dashboard built with **React (Next.js)** that displays an email list with search, filtering, pagination, and authentication.

This project was developed as part of a frontend assessment focused on performance, data fetching, and UI design consistency.


---

## 🚀 Features

* 🔍 **Search** – Debounced search to efficiently filter emails by subject or sender
* 🎯 **Filters** – Filter emails by status (e.g., read/unread)
* 📄 **Pagination** – Client-side pagination for easy navigation through email data
* 🔐 **Authentication** – Mock sign-in/sign-out flow using token-based local storage
* ⚡ **Performance Optimizations**

  * Lazy loading of components
  * React memoization (`useMemo`, `React.memo`)
  * Data caching and background refetching via React Query or SWR

---

## 🧠 Tech Stack

* **Framework:** Next.js (React)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Data Fetching & Caching:** React Query (or SWR)
* **API:** [Email List API](https://email-list-api-3.onrender.com)
* **Authentication:** Mock token-based auth

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/phartex/email-dashboard.git
cd email-dashboard-app
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Implementation Details

### Pagination

Implemented **client-side pagination** for simplicity and speed.
The dataset from the mock API is relatively small, so all data is fetched once and paginated locally for smoother navigation.

### Search & Filter

Search is **debounced** (300ms) to improve performance and reduce unnecessary re-renders.
Filters allow users to narrow down results by status or category.

### Performance Techniques

* **React.memo** for reusable components
* **useMemo** and **useCallback** to prevent unnecessary re-renders
* **Lazy loading** for non-critical components
* **Cached queries** for fast data access and background refresh

---

## 🔑 Authentication Flow

Authentication is managed using Zustand (for state) and js-cookie (for persistence).

When a user logs in, their token and basic profile info are stored securely in a browser cookie named authUser.

The cookie is:

Secure (only sent over HTTPS in production)

SameSite Strict (helps prevent CSRF attacks)

Automatically expires after 1 hour

The cookie is used to keep the user authenticated across page reloads.

On logout, the cookie is cleared and the user is redirected to the login page.

---

## 🧩 Folder Structure

```
src/
├── components/        # Reusable UI components (Table, Filters, Pagination, etc.)
├── pages/             # Next.js pages (Login, Dashboard)
├── hooks/             # Custom hooks for data fetching and pagination
├── utils/             # Utility functions
├── styles/            # Tailwind and global styles
```

---


## 🌍 Deployment

Easily deploy on **Vercel**:

```bash
netlify deploy
```

Or any platform that supports Next.js hosting.

---

## 📘 Notes & Tradeoffs

* **Pagination:** Client-side used for simplicity and smaller data size
* **Auth:** Mocked authentication without backend integration
* **Design:** Responsive layout with accessibility considerations
* **Caching:** Ensures fresh data without unnecessary refetching

---

## 👨‍💻 Author

**Fateru Victor Oluwatobi**
