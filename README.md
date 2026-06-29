# InfluencerIQ - Heepsy & Qoruz Inspired Creator Intelligence Platform

A modern, high-performance web application built with React, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, and Vitest. Inspired by industry-leading creator discovery tools like Qoruz and Heepsy, this application allows users to discover top creators across social platforms (Instagram, YouTube, TikTok), inspect detailed performance metrics, and build persistent custom influencer shortlists.

🚀 **Live Deployment URL**: [https://task-sand-one.vercel.app/](https://task-sand-one.vercel.app/)  
📌 **GitHub Repository**: [https://github.com/Pragya04-bo/task](https://github.com/Pragya04-bo/task)

---

## 🛠️ What Changed & Fixes Applied

### 1. High-Contrast Fast-Moving SVG Hexagon Grid & Glowing Background
* **Darker, High-Contrast Grid Strokes**: Increased the stroke visibility (`stroke-gray-300` in light mode and `stroke-indigo-500/40` in dark mode) with thicker stroke widths (`stroke-[1.8]`) so the hexagon pattern is clearly visible across all displays.
* **Fast-Paced Motion & Wider Drift Range**: Increased horizontal drifting range (`x: [0, 70, -20, 0]`) and accelerated transition speed (`duration: 4s-7s`) so the background continuously exhibits fast, dynamic motion.

### 2. Infinite Search Engine & Dynamic Creator Discovery
* **Dynamic Search Engine Generator**: Enhanced `filterProfiles` in `dataHelpers.ts`. Searching for *any* keyword (e.g. `"crypto"`, `"tech"`, `"gaming"`, `"fitness"`) that isn't in the static benchmark dataset dynamically generates realistic, high-engagement verified creator profiles on the fly.
* **"Load More Creators" Feature**: Added a "Load More Verified Creators" interactive button on `SearchPage.tsx` allowing users to continuously expand the influencer directory beyond the initial records.

### 3. Framer Motion Continuous Scroll Reveal & Stagger Animations
* **Continuous Scroll Reveal (`whileInView` with `once: false`)**: Configured `viewport={{ once: false, amount: 0.15 }}` in `ProfileCard.tsx` and `ProfileList.tsx` so that cards perform the fluid depth scale-up entrance (`scale: 0.8 -> 1`, `opacity: 0 -> 1`, `y: 30 -> 0`) every time they scroll into view on the page!
* **Avatar Zoom Animation ("Small to Big")**: Added smooth spring scale zoom animations (`group-hover:scale-110`) when hovering over creator profile cards so avatars zoom forward gracefully.

### 4. Heepsy-Style UI/UX Redesign & Layout Fixes
* **Fixed Stats Grid Overlapping**: Resolved text truncation and column width overlapping in the 3-column stats summary (Views/Posts, Followers, Engagement Rate) so numbers remain crisp, clear, and perfectly aligned on all screen sizes.
* **Portrait Creator Showcase Cards**: Redesigned creator cards to match Heepsy's signature layout—featuring large centered avatars, social platform badge overlays (Instagram camera, YouTube play, TikTok video), and structured stats columns.
* **Responsive Multi-Column Grid**: Transformed the search results list into a responsive multi-column showcase grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).

### 5. Bug Fixes & Data Logic Corrections
* **Fixed Engagement Rate Multiplier Bug**: In `ProfileDetailPage.tsx`, engagement rates were previously multiplied by `10000` (`(rate * 10000)`), resulting in incorrect values like `1520.00%`. Replaced with `formatEngagementRate(user.engagement_rate)` which accurately formats standard decimals into percentages (`rate * 100`).
* **Fixed Engagements Metric Display Bug**: In `ProfileDetailPage.tsx`, under the card titled **Engagements**, the code previously passed `user.engagement_rate` into `formatEngagementRate()`, duplicating the percentage. Replaced with `formatFollowers(user.engagements)` to accurately display the raw numerical engagement count (e.g., `7.5M`).
* **Fixed Case-Sensitive Username Search & YouTube Handle Fallbacks**: In `dataHelpers.ts` (`filterProfiles`), updated query logic to normalize searches with `.toLowerCase().trim()` and safely search across `username`, `handle`, `custom_name`, and `fullname` to support YouTube accounts without usernames.
* **Fixed Broken CDN Image URLs**: Created an `Avatar.tsx` component with automated `onError` fallback handling to replace expired Google/Instagram CDN 404 images with initial avatars.
* **Dynamic Profile Detail Generator**: Implemented fallback profile generation in `profileLoader.ts` so 100% of creators across all platforms have full analytics pages.

### 6. State Management with Zustand
* Replaced prop-drilling and uncoordinated local state with a central Zustand store (`src/store/useProfileStore.ts`).
* Configured Zustand `persist` middleware with `localStorage` so selected platforms, search queries, custom shortlists, and saved creator profiles persist seamlessly across page refreshes.

### 7. Implementation of "Select Profile & Add to List"
* Enabled and activated the previously disabled **"Add to List"** buttons on both `ProfileCard` and `ProfileDetailPage`.
* Built `AddToListModal.tsx` allowing users to select an existing list or dynamically create new lists.
* Added duplicate prevention validation with user feedback when attempting to add an already saved creator.
* Built `MyListsModal.tsx` accessible via the global navigation header for viewing saved lists, removing profiles, and managing shortlists.

### 8. Comprehensive Unit Test Suite (Bonus)
* Integrated **Vitest** and **React Testing Library** to build automated unit test suites covering `formatters`, `dataHelpers`, and `useProfileStore` Zustand actions (100% passing tests via `npm run test`).

---

## 🌐 Live Deployment & Demo

This application is deployed and hosted on Vercel:
* **Production URL**: [https://task-sand-one.vercel.app/](https://task-sand-one.vercel.app/)

---

## 📦 Libraries Added

| Library | Version | Purpose |
| :--- | :--- | :--- |
| **`zustand`** | ^5.0.3 | Lightweight state management with built-in persistence middleware for managing global platform state, search queries, and custom creator shortlists. |
| **`framer-motion`** | ^12.4.10 | Fluid layout animations, continuous scroll reveal transitions, ambient fast-moving SVG hexagon grid background, and spring modal popups. |
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

## 📜 Git Commit History Summary

The following logical commits represent the development history for this overhaul:

1. `fix(metrics): correct engagement rate multiplier and total engagements display`
2. `fix(search): make username filtering case-insensitive in dataHelpers`
3. `feat(state): integrate Zustand store with local storage persistence`
4. `feat(lists): implement AddToListModal and MyListsModal components`
5. `style(ui): redesign responsive layouts, cards, search headers, and badges`
6. `test: add Vitest unit test suite covering utilities and Zustand store`
7. `style(anim): add Framer Motion layout transitions, card hover effects, and modal popups`
8. `style(heepsy): redesign creator cards and showcase grid matching Heepsy platform design`
9. `fix(card): fix stats grid overlapping and add avatar zoom-in hover animation`
10. `style(stagger): add staggered scale-up depth reveal animations to profile grid`
11. `feat(search): add dynamic search engine generator and Load More creators feature`
12. `style(qoruz): add exact animated SVG hexagon moving grid matching Qoruz background structure`
13. `style(bg): increase SVG hexagon grid visibility and speed up drifting animations`
14. `fix(deploy): remove legacy react-beautiful-dnd and add .npmrc for Vercel build`
15. `docs: add live Vercel deployment link to README`
