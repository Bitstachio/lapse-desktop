import { useEffect, useRef, useState } from "react";
import { TProcessState } from "../types/process";
import { formatProcessDuration } from "../utils/time";

const useCountdown = (processState: TProcessState, startingDuration = 0) => {
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const interval = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      setRemainingDuration(0);
    }
  };

  useEffect(() => {
    if (!startingDuration) return;
    setRemainingDuration(startingDuration);

    if (processState === "inactive") reset();

    if (processState === "running" && !interval.current) {
      interval.current = setInterval(() => setRemainingDuration((prev) => prev - 1000), 1000);
    } else if (processState === "paused" && interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [processState, startingDuration]);

  useEffect(() => {
    setFormattedTime(formatProcessDuration(processState, startingDuration, remainingDuration));
  }, [remainingDuration]);

  // TODO: Determine whether using a state for formattedTime is appropriate
  // or would a useRef be more effective?
  return {
    formattedTime,
  };
};

export default useCountdown;
