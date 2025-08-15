import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.ts";
import { formatDuration, formatProcessDuration, formatTimeUnit } from "./utils.ts";
import { UnexpectedProcessStateError } from "../../errors/UnexpectedProcessStateError.ts";

describe(formatTimeUnit.name, () => {
  it("throws error for negative value", () => {
    expect(() => formatTimeUnit(-1)).toThrow(InvalidArgumentError);
  });

  it.each([
    { unit: -1, scenario: "negative" },
    { unit: 0.1, scenario: "not an integer" },
    { unit: Number.NaN, scenario: "NaN" },
    { unit: Number.POSITIVE_INFINITY, scenario: "infinity" },
    { unit: Number.NEGATIVE_INFINITY, scenario: "negative infinity" },
  ])("throws InvalidArgumentError when value is $scenario", ({ unit }) => {
    expect(() => formatTimeUnit(unit)).toThrow(InvalidArgumentError);
  });

  it.each([
    { unit: 0, expected: "00", scenario: "zero" },
    { unit: -0, expected: "00", scenario: "negative zero" },
    { unit: 1, expected: "01", scenario: "a single digit" },
    { unit: 99, expected: "99", scenario: "upper two digits" },
    { unit: 1234, expected: "1234", scenario: "more than two digits" },
  ])("formats properly when unit is $scenario", ({ unit, expected }) => {
    expect(formatTimeUnit(unit)).toEqual(expected);
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
