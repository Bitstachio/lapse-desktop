import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.ts";
import { UnexpectedProcessStateError } from "../../errors/UnexpectedProcessStateError.ts";
import { formatDuration, formatProcessDuration, padTime } from "./utils.ts";

describe("padTime", () => {
  it("throws error for negative value", () => {
    expect(() => padTime(-1)).toThrow(InvalidArgumentError);
  });

  it("works properly for 0", () => {
    expect(padTime(0)).toEqual("00");
  });

  it("works properly for single-digit value", () => {
    expect(padTime(4)).toEqual("04");
  });

  it("works properly for two-digit value", () => {
    expect(padTime(24)).toEqual("24");
  });

  it("works properly for more than two-digit value", () => {
    expect(padTime(1234)).toEqual("1234");
  });
});

describe("formatDuration", () => {
  // TODO: Having tested padding, how should I approach testing functions built on top of it?

  it("throws error for negative duration", () => {
    expect(() => formatDuration(-1)).toThrow(InvalidArgumentError);
  });

  it("rounds down seconds properly", () => {
    expect(formatDuration(260_800)).toEqual("00:04:20"); // 20.8 seconds
  });
});

describe("formatProcessDuration", () => {
  // TODO: Parametrize for all states
  it("throws error when starting duration is less than remaining duration", () => {
    expect(() => formatProcessDuration("inactive", 4, 5)).toThrow(InvalidArgumentError);
  });

  // TODO: Parameterize for different starting and remaining combinations
  it("throws error when reaching function in inactive state and non-zero starting and remaining times", () => {
    expect(() => formatProcessDuration("inactive", 1, 1)).toThrow(UnexpectedProcessStateError);
  });

  // TODO: Parameterize for all states
  it("", () => {
    expect(formatProcessDuration("inactive", 0, 0)).toEqual("00:00:00");
  });

  it("timeout has a negative sign", () => {
    expect(formatProcessDuration("timeout", 5_025_000, 0)).toEqual("-01:23:45");
  });

  it("formats timeout countdown using the difference of starting and remaining durations", () => {
    expect(formatProcessDuration("timeout", 5_045_000, 20_000)).toEqual("-01:23:45");
  });
});
