import { useMemo, useState } from "react";
import type { UserProfileSummary } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { AddToListModal } from "@/components/AddToListModal";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useProfileStore } from "@/store/useProfileStore";
import { Sparkles } from "lucide-react";

export function SearchPage() {
  const { selectedPlatform, setPlatform, searchQuery, setSearchQuery } = useProfileStore();
  const [modalProfile, setModalProfile] = useState<UserProfileSummary | null>(null);

  // Memoize profiles extraction and filtering for optimal performance
  const allProfiles = useMemo(() => {
    return extractProfiles(selectedPlatform);
  }, [selectedPlatform]);

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
    <Layout
      title="Find Top Influencers"
      subtitle="Discover, analyze, and shortlist top content creators across Instagram, YouTube, and TikTok."
    >
      {/* Search & Filter bar */}
      <PlatformFilter
        selected={selectedPlatform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results Count Bar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between px-2 mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>
            Showing <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> of{" "}
            {allProfiles.length} creators on{" "}
            <span className="capitalize text-indigo-600 dark:text-indigo-400 font-semibold">
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

      {/* Add To List Modal */}
      <AddToListModal
        profile={modalProfile}
        isOpen={!!modalProfile}
        onClose={() => setModalProfile(null)}
      />
    </Layout>
  );
}
