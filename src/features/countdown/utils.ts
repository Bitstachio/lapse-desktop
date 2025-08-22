import { InvalidArgumentError } from "../../errors/InvalidArgumentError";
import { UnexpectedProcessStateError } from "../../errors/UnexpectedProcessStateError";
import { assertNever } from "../../shared/utils/common";
import { TProcessState } from "../process/types";

export const formatTimeUnit = (unit: number) => {
  if (unit < 0) throw new InvalidArgumentError("Value must not be negative");
  if (!Number.isInteger(unit)) throw new InvalidArgumentError("Value must be an integer");
  return `${String(unit).padStart(2, "0")}`;
};

export const formatDuration = (duration: number, formatter: (unit: number) => string) => {
  if (duration < 0) throw new InvalidArgumentError("Duration must not be negative");

  const hours = Math.floor(duration / 3_600_000);
  const minutes = Math.floor((duration % 3_600_000) / 60_000);
  const seconds = Math.floor(((duration % 3_600_000) % 60_000) / 1000);

  return `${formatter(hours)}:${formatter(minutes)}:${formatter(seconds)}`;
};

export const formatProcessDuration = (state: TProcessState = "inactive", startingDuration: number = 0, remainingDuration: number = 0) => {
  if (startingDuration < remainingDuration)
    throw new InvalidArgumentError("Starting duration cannot be less than remaining duration");
  if (state === "inactive" && startingDuration !== 0 && remainingDuration !== 0)
    throw new UnexpectedProcessStateError(state);

  switch (state) {
    case "timeout":
      return `-${formatDuration(startingDuration - remainingDuration, formatTimeUnit)}`;
    case "inactive":
    case "running":
    case "paused":
      return formatDuration(remainingDuration > 0 ? remainingDuration : 0, formatTimeUnit);
    default:
      throw assertNever(state);
  }
};
