import type { ProfileDetailResponse, FullUserProfile, UserProfileSummary } from "@/types";
import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  if (!username || username === "undefined") {
    return null;
  }

  const cleanQuery = username.toLowerCase().trim();

  // 1. Try to load from assets/data/profiles/*.json files first
  const exactPath = `../assets/data/profiles/${username}.json`;
  let loader = profileModules[exactPath];

  if (!loader) {
    const targetKey = Object.keys(profileModules).find((key) =>
      key.toLowerCase().endsWith(`/${cleanQuery}.json`)
    );
    if (targetKey) {
      loader = profileModules[targetKey];
    }
  }

  if (loader) {
    try {
      const result = await loader();
      const data =
        (result as { default?: ProfileDetailResponse }).default ?? result;
      return data as ProfileDetailResponse;
    } catch (error) {
      console.warn(`Failed to load profile file for ${username}:`, error);
    }
  }

  // 2. Fallback: Search across search datasets (instagram, youtube, tiktok)
  const allSearchData = [
    { platform: "instagram", accounts: instagramData.accounts },
    { platform: "youtube", accounts: youtubeData.accounts },
    { platform: "tiktok", accounts: tiktokData.accounts },
  ];

  for (const dataset of allSearchData) {
    const match = dataset.accounts.find((item) => {
      const u = item.account.user_profile as UserProfileSummary;
      const id = (u.username || u.handle || u.custom_name || u.user_id).toLowerCase();
      return id === cleanQuery || (u.username && u.username.toLowerCase() === cleanQuery);
    });

    if (match) {
      const summary = match.account.user_profile as UserProfileSummary;
      const rate = summary.engagement_rate || 0.015;
      const engagements = summary.engagements ?? Math.round(summary.followers * rate);
      const avgLikes = Math.round(engagements * 0.9);
      const avgComments = Math.round(engagements * 0.1);
      const postsCount = Math.max(120, Math.round(summary.followers / 150000));

      const generatedProfile: FullUserProfile = {
        ...summary,
        type: dataset.platform,
        description: `${summary.fullname} is a featured top-tier creator on ${dataset.platform.toUpperCase()} with an active global audience.`,
        is_business: true,
        posts_count: postsCount,
        avg_likes: avgLikes,
        avg_comments: avgComments,
        engagements: engagements,
      };

      return {
        cached: false,
        data: {
          success: true,
          user_profile: generatedProfile,
        },
      };
    }
  }

  return null;
}
