import { UnexpectedProcessStateError } from "../errors/UnexpectedProcessStateError";
import { TProcessState } from "../types/process";

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60_000);
  const seconds = Math.floor((duration % 60_000) / 1000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const formatProcessDuration = (state: TProcessState, remainingDuration: number, startingDuration: number) => {
  // if (state === "inactive") throw new UnexpectedProcessStateError(state);
  if (state === "timeout") return `-${formatDuration(startingDuration - remainingDuration)}`;
  // TODO: Determine if `paused` is a valid state in this context
  return formatDuration(remainingDuration > 0 ? remainingDuration : 0);
  // TODO: Incorporate `never` to detect error at compile-time
  // throw new UnhandledCaseError(state);
};
