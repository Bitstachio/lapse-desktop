import { useEffect, useRef, useState } from "react";
import { TProcessState } from "../types/process";

const useCountdown = (processState: TProcessState, startingDuration?: number) => {
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
  }, [startingDuration, processState]);

  useEffect(() => {
    const minutes = Math.floor(remainingDuration / 60_000);
    const seconds = Math.floor((remainingDuration % 60_000) / 1000);
    setFormattedTime(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
  }, [remainingDuration]);

  // TODO: Determine whether using a state for formattedTime is appropriate
  // or would a useRef be more effective?
  return {
    formattedTime,
  };
};

export default useCountdown;
