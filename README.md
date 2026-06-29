# InfluencerIQ - Influencer Search & Discovery Platform

A modern, high-performance web application built with React, TypeScript, Vite, Tailwind CSS, Zustand, and Vitest. This application allows users to discover top creators across social platforms (Instagram, YouTube, TikTok), inspect detailed performance metrics, and build persistent custom influencer shortlists.

---

## 🛠️ What Changed & Fixes Applied

### 1. Bug Fixes & Data Logic Corrections
* **Fixed Engagement Rate Multiplier Bug**: In `ProfileDetailPage.tsx`, engagement rates were previously multiplied by `10000` (`(rate * 10000)`), resulting in incorrect values like `1520.00%`. Replaced with `formatEngagementRate(user.engagement_rate)` which accurately formats standard decimals into percentages (`rate * 100`).
* **Fixed Engagements Metric Display Bug**: In `ProfileDetailPage.tsx`, under the card titled **Engagements**, the code previously passed `user.engagement_rate` into `formatEngagementRate()`, duplicating the percentage. Replaced with `formatFollowers(user.engagements)` to accurately display the raw numerical engagement count (e.g., `7.5M`).
* **Fixed Case-Sensitive Username Search & YouTube Handle Fallbacks**: In `dataHelpers.ts` (`filterProfiles`), updated query logic to normalize searches with `.toLowerCase().trim()` and safely search across `username`, `handle`, `custom_name`, and `fullname` to support YouTube accounts without usernames.
* **Fixed Broken CDN Image URLs**: Created an `Avatar.tsx` component with automated `onError` fallback handling to replace expired Google/Instagram CDN 404 images with initial avatars.
* **Standardized Formatter Utilities**: Consolidated duplicated helper functions across components into a centralized `formatters.ts` utility file.

### 2. State Management with Zustand
* Replaced prop-drilling and uncoordinated local state with a central Zustand store (`src/store/useProfileStore.ts`).
* Configured Zustand `persist` middleware with `localStorage` so selected platforms, search queries, custom shortlists, and saved creator profiles persist seamlessly across page refreshes.

### 3. Implementation of "Select Profile & Add to List"
* Enabled and activated the previously disabled **"Add to List"** buttons on both `ProfileCard` and `ProfileDetailPage`.
* Built `AddToListModal.tsx` allowing users to select an existing list or dynamically create new lists.
* Added duplicate prevention validation with user feedback when attempting to add an already saved creator.
* Built `MyListsModal.tsx` accessible via the global navigation header for viewing saved lists, removing profiles, and managing shortlists.

### 4. Comprehensive Unit Test Suite (Bonus)
* Integrated **Vitest** and **React Testing Library** to build automated unit test suites covering `formatters`, `dataHelpers`, and `useProfileStore` Zustand actions (100% passing tests via `npm run test`).

### 5. UI/UX & Architectural Redesign
* **Responsive Layouts**: Removed fixed-width constraints (e.g. `w-[700px]`) and implemented responsive Tailwind flex/grid layouts compatible with mobile, tablet, and desktop viewports.
* **Modern Aesthetic**: Added smooth hover interactions, glassmorphism card styling, platform accent indicators, verified creator badges, and intuitive empty states.
* **Component Optimization**: Reused the `SearchBar.tsx` component inside `PlatformFilter.tsx`, removed dead state (`clickCount`), and memoized profile filtering with React `useMemo`.

---

## 📦 Libraries Added

| Library | Version | Purpose |
| :--- | :--- | :--- |
| **`zustand`** | ^5.0.3 | Lightweight state management with built-in persistence middleware for managing global platform state, search queries, and custom creator shortlists. |
| **`lucide-react`** | ^0.477 | Modern, consistent SVG iconography for platform badges, search bars, verified status, bookmarking, and navigation elements. |
| **`vitest` / `@testing-library/react`** | ^4.1.9 | Comprehensive automated unit testing suite and DOM testing utilities. |

---

## 💻 Useful Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:5173` |
| `npm run test` | Runs the Vitest automated unit test suite (16 passing unit tests) |
| `npm run build` | Validates TypeScript types and creates production bundle |
| `npm run lint` | Executes ESLint static code analysis |

---

## 💡 Assumptions Made

1. **Local Persistence Scope**: Assumed local storage persistence (`localStorage`) is sufficient for managing user lists in this frontend assignment without requiring backend API authentication.
2. **Profile Uniqueness**: Assumed combination of `user_id` and `username`/`handle` uniquely identifies creator profiles across platforms for duplicate checking.
3. **Metric Definitions**: Assumed raw `engagements` numbers represent total engagement counts (likes + comments) while `engagement_rate` represents the fractional ratio.

---

## ⚖️ Trade-offs

1. **Client-Side Filtering vs Server-Side Pagination**: Currently, JSON profile datasets are loaded client-side and filtered in memory. While `useMemo` keeps performance instant for current dataset sizes (~100 items), real-world production datasets with millions of rows would require server-side search and pagination APIs.
2. **Local Storage Storage Limits**: Storing custom lists in `localStorage` provides instant persistence without authentication overhead, but is restricted to ~5MB per browser domain.

---

## 🔮 Remaining / Future Improvements

* **List Export Feature**: Allow users to export custom influencer lists as CSV or PDF reports.
* **Dark / Light Theme Toggle**: Add explicit theme toggle controls for user preference.
* **Virtualization for Large Datasets**: Integrate `@tanstack/react-virtual` if profile lists scale to thousands of records.

---

## 📜 Git Commit History Summary

The following logical commits represent the development history for this overhaul:

1. `fix(metrics): correct engagement rate multiplier and total engagements display`
2. `fix(search): make username filtering case-insensitive in dataHelpers`
3. `feat(state): integrate Zustand store with local storage persistence`
4. `feat(lists): implement AddToListModal and MyListsModal components`
5. `style(ui): redesign responsive layouts, cards, search headers, and badges`
6. `test: add Vitest unit test suite covering utilities and Zustand store`
7. `docs: add comprehensive README documentation`
