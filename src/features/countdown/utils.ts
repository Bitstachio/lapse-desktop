import { InvalidArgumentError } from "../../errors/InvalidArgumentError";
import { UnexpectedProcessStateError } from "../../errors/UnexpectedProcessStateError";
import { TProcessState } from "../process/types";
import { assertNever } from "../../shared/utils/common";

export const formatDuration = (duration: number) => {
  if (duration < 0) throw new InvalidArgumentError("Duration must not be negative");

  const minutes = Math.floor(duration / 60_000);
  const seconds = Math.floor((duration % 60_000) / 1000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
