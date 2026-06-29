import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
  onAddToList?: (profile: UserProfileSummary) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
  onAddToList,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl text-center max-w-lg mx-auto my-8 shadow-sm">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 mb-3">
          <SearchX className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">No creators found</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs leading-relaxed">
          No matches found for "{searchQuery}" on {platform}. Try adjusting your search query or switching platform tabs.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={`${platform}-${searchQuery}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.05 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-2"
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
          onAddToList={onAddToList}
        />
      ))}
    </motion.div>
  );
}
