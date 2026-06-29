import { describe, it, expect } from "vitest";
import { filterProfiles, getProfileIdentifier } from "../dataHelpers";
import type { UserProfileSummary } from "@/types";

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "MrBeast6000",
    handle: "MrBeast",
    fullname: "MrBeast",
    url: "https://youtube.com",
    picture: "https://example.com/pic.jpg",
    is_verified: true,
    followers: 324000000,
  },
  {
    user_id: "2",
    username: undefined,
    handle: "VladandNiki",
    fullname: "Vlad and Niki",
    url: "https://youtube.com",
    picture: "https://example.com/pic2.jpg",
    is_verified: false,
    followers: 100000000,
  },
  {
    user_id: "3",
    username: "cristiano",
    fullname: "Cristiano Ronaldo",
    url: "https://instagram.com",
    picture: "https://example.com/pic3.jpg",
    is_verified: true,
    followers: 600000000,
  },
];

describe("dataHelpers utility", () => {
  describe("getProfileIdentifier", () => {
    it("returns username when present", () => {
      expect(getProfileIdentifier(mockProfiles[0])).toBe("MrBeast6000");
    });

    it("falls back to handle when username is undefined", () => {
      expect(getProfileIdentifier(mockProfiles[1])).toBe("VladandNiki");
    });
  });

  describe("filterProfiles", () => {
    it("returns all profiles when query is empty", () => {
      expect(filterProfiles(mockProfiles, "")).toHaveLength(3);
    });

    it("performs case-insensitive search matching username", () => {
      const results = filterProfiles(mockProfiles, "mrbeast");
      expect(results).toHaveLength(1);
      expect(results[0].fullname).toBe("MrBeast");
    });

    it("matches creators by handle when username is undefined", () => {
      const results = filterProfiles(mockProfiles, "vladandniki");
      expect(results).toHaveLength(1);
      expect(results[0].handle).toBe("VladandNiki");
    });

    it("matches creators by full name", () => {
      const results = filterProfiles(mockProfiles, "ronaldo");
      expect(results).toHaveLength(1);
      expect(results[0].username).toBe("cristiano");
    });
  });
});
