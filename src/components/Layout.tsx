import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sparkles, BookmarkCheck, Compass } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { MyListsModal } from "./MyListsModal";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const { lists } = useProfileStore();

  const totalSavedProfiles = lists.reduce((acc, l) => acc + l.profiles.length, 0);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white rounded-xl shadow-md shadow-indigo-200 dark:shadow-none group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-800 dark:from-white dark:via-indigo-200 dark:to-gray-300 bg-clip-text text-transparent">
                InfluencerIQ
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                Discovery
              </span>
            </div>
          </Link>

          {/* Action Header Nav */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Explore</span>
            </Link>

            <button
              onClick={() => setIsListsModalOpen(true)}
              className="relative px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-all active:scale-95"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>My Lists</span>
              {totalSavedProfiles > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-white text-indigo-700 rounded-full">
                  {totalSavedProfiles}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8">
        {title && (
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 py-6 text-center text-xs text-gray-400 dark:text-gray-600 bg-white/50 dark:bg-gray-900/50">
        <p>© 2026 InfluencerIQ • Modern Creator Intelligence Platform</p>
      </footer>

      {/* Global Saved Lists Modal */}
      <MyListsModal isOpen={isListsModalOpen} onClose={() => setIsListsModalOpen(false)} />
    </div>
  );
}
