import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { SearchX } from "lucide-react";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
  onAddToList?: (profile: UserProfileSummary) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
  onAddToList,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl text-center max-w-lg mx-auto my-6 shadow-xs">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-400 mb-3">
          <SearchX className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">No creators found</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
          No matches found for "{searchQuery}" on {platform}. Try adjusting your search query or platform filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
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
    </div>
  );
}
