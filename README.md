# InfluencerIQ - Influencer Search & Discovery Platform

A modern, high-performance web application built with React, TypeScript, Vite, Tailwind CSS, and Zustand. This application allows users to discover top creators across social platforms (Instagram, YouTube, TikTok), inspect detailed performance metrics, and build persistent custom influencer shortlists.

---

## 🛠️ What Changed & Fixes Applied

### 1. Bug Fixes & Data Logic Corrections
* **Fixed Engagement Rate Multiplier Bug**: In `ProfileDetailPage.tsx`, engagement rates were previously multiplied by `10000` (`(rate * 10000)`), resulting in incorrect values like `1520.00%`. Replaced with `formatEngagementRate(user.engagement_rate)` which accurately formats standard decimals into percentages (`rate * 100`).
* **Fixed Engagements Metric Display Bug**: In `ProfileDetailPage.tsx`, under the card titled **Engagements**, the code previously passed `user.engagement_rate` into `formatEngagementRate()`, duplicating the percentage. Replaced with `formatFollowers(user.engagements)` to accurately display the raw numerical engagement count (e.g., `7.5M`).
* **Fixed Case-Sensitive Username Search**: In `dataHelpers.ts` (`filterProfiles`), username matching was case-sensitive while full name matching was case-insensitive. Updated query logic to normalize both inputs with `.toLowerCase().trim()`.
* **Standardized Formatter Utilities**: Consolidated duplicated helper functions (`formatFollowersLocal`, `formatFollowersDetail`) across `ProfileCard.tsx` and `ProfileDetailPage.tsx` into a centralized `formatters.ts` utility file.

### 2. State Management with Zustand
* Replaced prop-drilling and uncoordinated local state with a central Zustand store (`src/store/useProfileStore.ts`).
* Configured Zustand `persist` middleware with `localStorage` so selected platforms, search queries, custom shortlists, and saved creator profiles persist seamlessly across page refreshes.

### 3. Implementation of "Select Profile & Add to List"
* Enabled and activated the previously disabled **"Add to List"** buttons on both `ProfileCard` and `ProfileDetailPage`.
* Built `AddToListModal.tsx` allowing users to select an existing list or dynamically create new lists.
* Added duplicate prevention validation with user feedback when attempting to add an already saved creator.
* Built `MyListsModal.tsx` accessible via the global navigation header for viewing saved lists, removing profiles, and managing shortlists.

### 4. UI/UX & Architectural Redesign
* **Responsive Layouts**: Removed fixed-width constraints (e.g. `w-[700px]`) and implemented responsive Tailwind flex/grid layouts compatible with mobile, tablet, and desktop viewports.
* **Modern Aesthetic**: Added smooth hover interactions, glassmorphism card styling, platform accent indicators, verified creator badges, and intuitive empty states.
* **Component Optimization**: Reused the `SearchBar.tsx` component inside `PlatformFilter.tsx`, removed dead state (`clickCount`), and memoized profile filtering with React `useMemo`.

---

## 📦 Libraries Added

| Library | Version | Purpose |
| :--- | :--- | :--- |
| **`zustand`** | ^5.0.3 | Lightweight state management with built-in persistence middleware for managing global platform state, search queries, and custom creator shortlists. |
| **`lucide-react`** | ^0.477 text/icons | Modern, consistent SVG iconography for platform badges, search bars, verified status, bookmarking, and navigation elements. |

---

## 💡 Assumptions Made

1. **Local Persistence Scope**: Assumed local storage persistence (`localStorage`) is sufficient for managing user lists in this frontend assignment without requiring backend API authentication.
2. **Profile Uniqueness**: Assumed combination of `user_id` and `username` uniquely identifies creator profiles across platforms for duplicate checking.
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
   - Fixed `* 10000` bug and raw engagements count mapping in `ProfileDetailPage.tsx`.
2. `fix(search): make username filtering case-insensitive in dataHelpers`
   - Updated `filterProfiles` to normalize queries and usernames with `.toLowerCase()`.
3. `feat(state): integrate Zustand store with local storage persistence`
   - Added `useProfileStore.ts` for managing platform state and custom creator shortlists.
4. `feat(lists): implement AddToListModal and MyListsModal components`
   - Enabled shortlist creation, profile bookmarking, duplicate prevention, and list management.
5. `style(ui): redesign responsive layouts, cards, search headers, and badges`
   - Replaced fixed widths with responsive grid design, added Lucide icons, and modernized styling.
6. `docs: add comprehensive README documentation`
   - Documented changes, libraries, assumptions, trade-offs, and verification steps.
