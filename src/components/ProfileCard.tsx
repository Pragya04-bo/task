import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { Avatar } from "./Avatar";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { getProfileIdentifier } from "@/utils/dataHelpers";
import { BookmarkPlus, Camera, Play, Video } from "lucide-react";
import { motion, type Variants } from "framer-motion";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
  onAddToList?: (profile: UserProfileSummary) => void;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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

  const renderPlatformBadge = () => {
    switch (platform) {
      case "instagram":
        return (
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-full shadow-md ring-2 ring-white dark:ring-gray-900 z-20">
            <Camera className="w-3 h-3" />
          </div>
        );
      case "youtube":
        return (
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-red-600 text-white rounded-full shadow-md ring-2 ring-white dark:ring-gray-900 z-20">
            <Play className="w-3 h-3 fill-white" />
          </div>
        );
      case "tiktok":
        return (
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-black dark:bg-gray-800 text-cyan-400 rounded-full shadow-md ring-2 ring-white dark:ring-gray-900 z-20">
            <Video className="w-3 h-3" />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="group relative flex flex-col items-center p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer w-full text-center overflow-hidden"
    >
      {/* Avatar with "Small to Big" Zoom Animation on Hover */}
      <div className="relative mb-4">
        <div className="transition-transform duration-300 ease-out transform group-hover:scale-110 z-10 relative">
          <Avatar
            src={profile.picture}
            alt={profile.fullname || identifier}
            name={profile.fullname || identifier}
            className="w-20 h-20 shadow-md ring-4 ring-gray-50 dark:ring-gray-800 group-hover:ring-indigo-500/30 transition-all"
          />
        </div>
        {renderPlatformBadge()}
      </div>

      {/* Title & Handle - Fixed Truncation Overflow */}
      <div className="w-full min-w-0 px-1 mb-4">
        <h3 className="font-extrabold text-gray-900 dark:text-white text-base truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-center gap-1">
          <span className="truncate">{profile.fullname || identifier}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </h3>
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 truncate mt-0.5">
          @{identifier}
        </p>
      </div>

      {/* 3-Column Stats Grid - FIXED OVERLAPPING NUMBERS */}
      <div className="w-full grid grid-cols-3 gap-1 py-3 px-1.5 bg-gray-50/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800/80 mb-4 text-center items-center">
        <div className="min-w-0 px-0.5">
          <div className="text-xs font-extrabold text-gray-900 dark:text-white truncate" title={profile.avg_views ? formatFollowers(profile.avg_views) : formatFollowers(profile.followers)}>
            {profile.avg_views ? formatFollowers(profile.avg_views) : formatFollowers(profile.followers)}
          </div>
          <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight mt-0.5 truncate">
            {profile.avg_views ? "Views" : "Followers"}
          </div>
        </div>

        <div className="min-w-0 px-0.5 border-x border-gray-200/60 dark:border-gray-700/60">
          <div className="text-xs font-extrabold text-gray-900 dark:text-white truncate" title={formatFollowers(profile.followers)}>
            {formatFollowers(profile.followers)}
          </div>
          <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight mt-0.5 truncate">
            Followers
          </div>
        </div>

        <div className="min-w-0 px-0.5">
          <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 truncate" title={formatEngagementRate(profile.engagement_rate)}>
            {formatEngagementRate(profile.engagement_rate)}
          </div>
          <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight mt-0.5 truncate">
            Eng. Rate
          </div>
        </div>
      </div>

      {/* Add to List Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={handleAddClick}
        className="w-full py-2.5 px-3 bg-gray-900 hover:bg-indigo-600 dark:bg-white dark:hover:bg-indigo-500 text-white dark:text-gray-900 dark:hover:text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
      >
        <BookmarkPlus className="w-4 h-4" />
        <span>Save to Shortlist</span>
      </motion.button>
    </motion.div>
  );
}
