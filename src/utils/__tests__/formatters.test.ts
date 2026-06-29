import { describe, it, expect } from "vitest";
import { formatFollowers, formatEngagementRate } from "../formatters";

describe("formatters utility", () => {
  describe("formatFollowers", () => {
    it("formats counts over 1,000,000 with M suffix", () => {
      expect(formatFollowers(1000000)).toBe("1.0M");
      expect(formatFollowers(324000000)).toBe("324.0M");
      expect(formatFollowers(1550000)).toBe("1.6M");
    });

    it("formats counts over 1,000 with K suffix", () => {
      expect(formatFollowers(1000)).toBe("1.0K");
      expect(formatFollowers(50000)).toBe("50.0K");
      expect(formatFollowers(9999)).toBe("10.0K");
    });

    it("returns exact string for counts under 1,000", () => {
      expect(formatFollowers(500)).toBe("500");
      expect(formatFollowers(0)).toBe("0");
    });
  });

  describe("formatEngagementRate", () => {
    it("returns N/A when rate is undefined", () => {
      expect(formatEngagementRate(undefined)).toBe("N/A");
    });

    it("correctly formats fractional decimals to percentages (*100)", () => {
      expect(formatEngagementRate(0.012551)).toBe("1.26%");
      expect(formatEngagementRate(0.05)).toBe("5.00%");
      expect(formatEngagementRate(0.182619)).toBe("18.26%");
    });
  });
});
