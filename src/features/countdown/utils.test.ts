import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { formatDuration } from "./utils.ts";

describe("formatDuration", () => {
  it("throws error for negative duration", () => {
    // TODO: Determine how to throw error of particular type
    expect(formatDuration(-1)).toThrow();
  });

  it("works properly for 0", () => {
    // TODO: Determine .toEqual to .toStrictEqual
    expect(formatDuration(0)).toEqual("00:00");
  });

  it("pads single-digit minutes properly", () => {
    expect(formatDuration(260_000)).toEqual("04:20");
  });

  it("pads single-digit seconds properly", () => {
    expect(formatDuration(242_000)).toEqual("04:02");
  });

  it("rounds down seconds properly", () => {
    expect(formatDuration(260_800)).toEqual("04:20"); // 20.8 seconds
  });
});
