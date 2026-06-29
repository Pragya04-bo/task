import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { SearchBar } from "./SearchBar";
import { Camera, Play, Video } from "lucide-react";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "instagram":
        return <Camera className="w-4 h-4 text-pink-500" />;
      case "youtube":
        return <Play className="w-4 h-4 text-red-500 fill-red-500" />;
      case "tiktok":
        return <Video className="w-4 h-4 text-cyan-500" />;
    }
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Platform Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl max-w-md mx-auto border border-gray-200/50 dark:border-gray-700/50">
        {PLATFORMS.map((p) => {
          const isActive = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm shadow-gray-200/50 dark:shadow-none scale-[1.02]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              {getPlatformIcon(p)}
              <span>{getPlatformLabel(p)}</span>
            </button>
          );
        })}
      </div>

      {/* Reusable Search Bar Component */}
      <SearchBar value={searchQuery} onChange={onSearchChange} />
    </div>
  );
}
