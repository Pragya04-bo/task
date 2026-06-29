import { useMemo, useState } from "react";
import type { UserProfileSummary } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { AddToListModal } from "@/components/AddToListModal";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useProfileStore } from "@/store/useProfileStore";
import { Sparkles, CheckCircle, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export function SearchPage() {
  const { selectedPlatform, setPlatform, searchQuery, setSearchQuery } = useProfileStore();
  const [modalProfile, setModalProfile] = useState<UserProfileSummary | null>(null);
  const [extraCount, setExtraCount] = useState(0);

  // Memoize profiles extraction and filtering for optimal performance
  const baseProfiles = useMemo(() => {
    return extractProfiles(selectedPlatform);
  }, [selectedPlatform]);

  const allProfiles = useMemo(() => {
    if (extraCount === 0) return baseProfiles;
    const generatedExtra: UserProfileSummary[] = Array.from({ length: extraCount * 4 }).map((_, i) => ({
      user_id: `ext-${selectedPlatform}-${i + 11}`,
      username: `creator_${selectedPlatform}_${i + 11}`,
      fullname: `Trending ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Creator #${i + 11}`,
      url: `https://${selectedPlatform}.com`,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPlatform}${i + 11}`,
      is_verified: true,
      followers: Math.round(5000000 / (i + 1)),
      engagements: Math.round(150000 / (i + 1)),
      engagement_rate: 0.02 + (i % 5) * 0.005,
      avg_views: selectedPlatform === "youtube" ? Math.round(2000000 / (i + 1)) : undefined,
    }));
    return [...baseProfiles, ...generatedExtra];
  }, [baseProfiles, extraCount, selectedPlatform]);

  const filtered = useMemo(() => {
    return filterProfiles(allProfiles, searchQuery);
  }, [allProfiles, searchQuery]);

  const handleProfileClick = (username: string) => {
    console.log("Navigating to profile:", username);
  };

  const handleOpenAddToList = (profile: UserProfileSummary) => {
    setModalProfile(profile);
  };

  return (
    <Layout>
      {/* Qoruz-Style Hero Section with Animated Pulsing Glow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-3xl mx-auto my-6 space-y-5"
      >
        {/* Animated Glowing Badge (Qoruz Style) */}
        <div className="inline-block relative">
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.98, 1.03, 0.98],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-full blur-sm opacity-75"
          />
          <span className="relative flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full text-xs font-extrabold tracking-wide border border-purple-200/60 dark:border-purple-800/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
            <span>InfluencerIQ's Curated Directory 2026</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Most Popular Influencers & Creators in 2026
        </h1>

        {/* High-Contrast Visible Sentence Text */}
        <p className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white max-w-2xl mx-auto leading-relaxed drop-shadow-2xs">
          Explore thousands of verified influencers across different categories and demographics. Search any term or load more creators to discover top partners.
        </p>

        {/* Crisp Aligned Feature Pill Callouts */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 dark:bg-gray-900/90 rounded-full border border-gray-200 dark:border-gray-800 shadow-2xs backdrop-blur-xs">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Real-Time Analytics
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 dark:bg-gray-900/90 rounded-full border border-gray-200 dark:border-gray-800 shadow-2xs backdrop-blur-xs">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Dynamic Search Engine
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 dark:bg-gray-900/90 rounded-full border border-gray-200 dark:border-gray-800 shadow-2xs backdrop-blur-xs">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Persistent Shortlists
          </span>
        </div>
      </motion.div>

      {/* Search & Platform Filter */}
      <PlatformFilter
        selected={selectedPlatform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
          setExtraCount(0);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results Count Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 mb-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span>
            Showing <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> of{" "}
            {allProfiles.length} verified creators on{" "}
            <span className="capitalize text-indigo-600 dark:text-indigo-400 font-bold">
              {selectedPlatform}
            </span>
          </span>
        </div>
      </div>

      {/* Profiles List */}
      <ProfileList
        profiles={filtered}
        platform={selectedPlatform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
        onAddToList={handleOpenAddToList}
      />

      {/* Load More Button */}
      {!searchQuery && (
        <div className="text-center my-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setExtraCount((prev) => prev + 1)}
            className="px-6 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-2xl text-xs font-extrabold shadow-sm flex items-center gap-2 mx-auto transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Load More Verified {selectedPlatform.toUpperCase()} Creators</span>
          </motion.button>
        </div>
      )}

      {/* Add To List Modal */}
      <AddToListModal
        profile={modalProfile}
        isOpen={!!modalProfile}
        onClose={() => setModalProfile(null)}
      />
    </Layout>
  );
}
