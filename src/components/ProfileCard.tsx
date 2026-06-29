import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { Avatar } from "./Avatar";
import { formatFollowers } from "@/utils/formatters";
import { getProfileIdentifier } from "@/utils/dataHelpers";
import { BookmarkPlus, ChevronRight, Users } from "lucide-react";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
  onAddToList?: (profile: UserProfileSummary) => void;
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
  onAddToList,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const identifier = getProfileIdentifier(profile);

  const handleCardClick = () => {
    if (onProfileClick) onProfileClick(identifier);
    navigate(`/profile/${identifier}?platform=${platform}`);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToList) {
      onAddToList(profile);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-200 cursor-pointer w-full"
    >
      {/* Left section: Avatar & Details */}
      <div className="flex items-center gap-4 min-w-0 pr-4">
        <Avatar
          src={profile.picture}
          alt={profile.fullname || identifier}
          name={profile.fullname || identifier}
          className="w-14 h-14 ring-2 ring-gray-100 dark:ring-gray-800 group-hover:ring-indigo-500/30 transition-all"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-base truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              @{identifier}
            </h3>
            <VerifiedBadge verified={profile.is_verified} />
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {profile.fullname}
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center gap-1 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-gray-700 dark:text-gray-300">
              <Users className="w-3 h-3 text-indigo-500" />
              {formatFollowers(profile.followers)} followers
            </span>
            {profile.engagement_rate !== undefined && (
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {(profile.engagement_rate * 100).toFixed(2)}% ER
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={handleAddClick}
          className="px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 shadow-xs active:scale-95"
          title="Save profile to list"
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add to List</span>
        </button>

        <div className="p-2 text-gray-300 dark:text-gray-700 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
