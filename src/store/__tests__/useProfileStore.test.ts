import { describe, it, expect, beforeEach } from "vitest";
import { useProfileStore } from "../useProfileStore";
import type { UserProfileSummary } from "@/types";

const mockProfile: UserProfileSummary = {
  user_id: "test-123",
  username: "testuser",
  fullname: "Test User",
  url: "https://example.com",
  picture: "https://example.com/pic.jpg",
  is_verified: true,
  followers: 50000,
};

describe("useProfileStore Zustand store", () => {
  beforeEach(() => {
    useProfileStore.setState({
      selectedPlatform: "instagram",
      searchQuery: "",
      lists: [
        {
          id: "default-favorites",
          name: "Favorites",
          createdAt: Date.now(),
          profiles: [],
        },
      ],
    });
  });

  it("updates selected platform", () => {
    useProfileStore.getState().setPlatform("youtube");
    expect(useProfileStore.getState().selectedPlatform).toBe("youtube");
  });

  it("updates search query", () => {
    useProfileStore.getState().setSearchQuery("ronaldo");
    expect(useProfileStore.getState().searchQuery).toBe("ronaldo");
  });

  it("creates a new custom list", () => {
    const newList = useProfileStore.getState().createList("Campaign Q3");
    expect(newList.name).toBe("Campaign Q3");
    expect(useProfileStore.getState().lists).toHaveLength(2);
  });

  it("adds profile to list and prevents duplicates", () => {
    const listId = "default-favorites";
    
    // First addition should succeed
    const res1 = useProfileStore.getState().addProfileToList(listId, mockProfile);
    expect(res1.success).toBe(true);
    expect(useProfileStore.getState().lists[0].profiles).toHaveLength(1);

    // Duplicate addition should fail
    const res2 = useProfileStore.getState().addProfileToList(listId, mockProfile);
    expect(res2.success).toBe(false);
    expect(res2.message).toContain("Already in");
    expect(useProfileStore.getState().lists[0].profiles).toHaveLength(1);
  });

  it("removes profile from list", () => {
    const listId = "default-favorites";
    useProfileStore.getState().addProfileToList(listId, mockProfile);
    expect(useProfileStore.getState().lists[0].profiles).toHaveLength(1);

    useProfileStore.getState().removeProfileFromList(listId, mockProfile.user_id);
    expect(useProfileStore.getState().lists[0].profiles).toHaveLength(0);
  });
});
