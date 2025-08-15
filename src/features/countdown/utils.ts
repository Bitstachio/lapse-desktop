import { InvalidArgumentError } from "../../errors/InvalidArgumentError";
import { UnexpectedProcessStateError } from "../../errors/UnexpectedProcessStateError";
import { assertNever } from "../../shared/utils/common";
import { TProcessState } from "../process/types";

export const padTime = (value: number) => {
  if (value < 0) throw new InvalidArgumentError("Value must not be negative");
  return `${String(value).padStart(2, "0")}`;
};

export const formatDuration = (duration: number) => {
  if (duration < 0) throw new InvalidArgumentError("Duration must not be negative");

  const hours = Math.floor(duration / 3_600_000);
  const minutes = Math.floor((duration % 3_600_000) / 60_000);
  const seconds = Math.floor((duration % 3_600_000 % 60_000) / 1000);

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

export const formatProcessDuration = (state: TProcessState, startingDuration: number, remainingDuration: number) => {
  if (startingDuration < remainingDuration)
    throw new InvalidArgumentError("Starting duration cannot be less than remaining duration");
  if (state === "inactive" && startingDuration !== 0 && remainingDuration !== 0)
    throw new UnexpectedProcessStateError(state);

  switch (state) {
    case "timeout":
      return `-${formatDuration(startingDuration - remainingDuration)}`;
    case "inactive":
    case "running":
    case "paused":
      return formatDuration(remainingDuration > 0 ? remainingDuration : 0);
    default:
      throw assertNever(state);
  }
};
