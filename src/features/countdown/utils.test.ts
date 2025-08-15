import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.ts";
import { UnexpectedProcessStateError } from "../../errors/UnexpectedProcessStateError.ts";
import { formatDuration, formatProcessDuration, formatTimeUnit } from "./utils.ts";

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

describe(formatDuration.name, () => {
  it("throws error for negative duration", () => {
    const mockFormatter = vi.fn();
    expect(() => formatDuration(-1, mockFormatter)).toThrow(InvalidArgumentError);
  });

  it.each([
    { scenario: "zero duration correctly", duration: 0, expected: [0, 0, 0] },
    { scenario: "long duration into hours, minutes, and seconds", duration: 5_025_000, expected: [1, 23, 45] },
    { scenario: "durations exceeding 24 hours", duration: 90_000_000, expected: [25, 0, 0] },
    // Rollovers and rounding behavior
    { scenario: "sub-second duration correctly", duration: 999, expected: [0, 0, 0] },
    { scenario: "seconds-to-minutes rollover", duration: 59_999, expected: [0, 0, 59] },
    { scenario: "exactly one minute", duration: 60_000, expected: [0, 1, 0] },
    { scenario: "minutes-to-hours rollover", duration: 3_599_999, expected: [0, 59, 59] },
    { scenario: "exactly one hour", duration: 3_600_000, expected: [1, 0, 0] },
    { scenario: "hours-to-next-hour rollover", duration: 3_959_999, expected: [1, 5, 59] },
    { scenario: "multi-hour rollover edge", duration: 86_399_999, expected: [23, 59, 59] },
  ])("formats $scenario", ({ duration, expected }) => {
    const mockFormatter = vi.fn((unit: number) => `unit-${unit}`);
    const result = formatDuration(duration, mockFormatter);
    const mockReturns = mockFormatter.mock.results;

    expect(mockFormatter).toHaveBeenCalledTimes(3);
    expected.forEach((unit, index) => expect(mockFormatter).toHaveBeenNthCalledWith(index + 1, unit));
    expect(result).toBe(`${mockReturns[0].value}:${mockReturns[1].value}:${mockReturns[2].value}`);
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
