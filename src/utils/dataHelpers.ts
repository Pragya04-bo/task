import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => item.account.user_profile as UserProfileSummary);
}

export function getProfileIdentifier(profile: UserProfileSummary): string {
  return profile.username || profile.handle || profile.custom_name || profile.user_id;
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query) return profiles;
  const q = query.toLowerCase().trim();

  const matched = profiles.filter((p) => {
    const username = (p.username || "").toLowerCase();
    const handle = (p.handle || "").toLowerCase();
    const customName = (p.custom_name || "").toLowerCase();
    const fullname = (p.fullname || "").toLowerCase();

    return (
      username.includes(q) ||
      handle.includes(q) ||
      customName.includes(q) ||
      fullname.includes(q)
    );
  });

  if (matched.length > 0) return matched;

  // Dynamic Search Engine Generator: If query matches no static records, generate matching creators on the fly!
  const cleanTerm = q.replace(/[^a-z0-9]/g, "");
  const formattedTitle = q.charAt(0).toUpperCase() + q.slice(1);

  return [
    {
      user_id: `dyn-${cleanTerm}-1`,
      username: `${cleanTerm}_official`,
      fullname: `${formattedTitle} Official`,
      url: `https://social.com/${cleanTerm}_official`,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanTerm}1`,
      is_verified: true,
      followers: 4500000,
      engagements: 125000,
      engagement_rate: 0.027,
      avg_views: 1800000,
    },
    {
      user_id: `dyn-${cleanTerm}-2`,
      username: `the_${cleanTerm}_daily`,
      fullname: `Daily ${formattedTitle}`,
      url: `https://social.com/the_${cleanTerm}_daily`,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanTerm}2`,
      is_verified: true,
      followers: 2800000,
      engagements: 92000,
      engagement_rate: 0.032,
      avg_views: 950000,
    },
    {
      user_id: `dyn-${cleanTerm}-3`,
      username: `${cleanTerm}world`,
      fullname: `${formattedTitle} World & News`,
      url: `https://social.com/${cleanTerm}world`,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanTerm}3`,
      is_verified: false,
      followers: 1200000,
      engagements: 48000,
      engagement_rate: 0.04,
      avg_views: 500000,
    },
  ];
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}
