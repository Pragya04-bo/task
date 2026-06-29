import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sparkles, BookmarkCheck, Compass, ArrowUpRight } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { MyListsModal } from "./MyListsModal";
import { AnimatedBackground } from "./AnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const { lists } = useProfileStore();

  const totalSavedProfiles = lists.reduce((acc, l) => acc + l.profiles.length, 0);

  return (
    <div className="relative min-h-screen bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Qoruz-style Floating Background Animation */}
      <AnimatedBackground />

      {/* Sleek Header Navigation (Heepsy / Qoruz style) */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 px-4 sm:px-8 py-4 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-2xl shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                INFLUENCER<span className="text-indigo-600 dark:text-indigo-400">.IQ</span>
              </span>
            </div>
          </Link>

          {/* Action Header Nav */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Discovery Engine</span>
            </Link>

            <button
              onClick={() => setIsListsModalOpen(true)}
              className="relative px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-all active:scale-95"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>My Saved Lists</span>
              {totalSavedProfiles > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-black bg-white text-indigo-700 rounded-full">
                  {totalSavedProfiles}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/60 dark:border-gray-800/60 py-8 text-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
            <span>© 2026 InfluencerIQ • Creator Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <a href="https://qoruz.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 flex items-center gap-1">
              Inspired by Qoruz & Heepsy <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Global Saved Lists Modal */}
      <MyListsModal isOpen={isListsModalOpen} onClose={() => setIsListsModalOpen(false)} />
    </div>
  );
}
