import type { ProfileDetailResponse } from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  if (!username || username === "undefined") {
    return null;
  }

  // Try exact username lookup
  const path = `../assets/data/profiles/${username}.json`;
  let loader = profileModules[path];

  // If not found directly, check case-insensitive match among keys
  if (!loader) {
    const targetKey = Object.keys(profileModules).find((key) =>
      key.toLowerCase().endsWith(`/${username.toLowerCase()}.json`)
    );
    if (targetKey) {
      loader = profileModules[targetKey];
    }
  }

  if (!loader) {
    return null;
  }

  try {
    const result = await loader();
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  } catch (error) {
    console.warn(`Failed to load profile details for ${username}:`, error);
    return null;
  }
}
