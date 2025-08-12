import { useEffect, useRef, useState } from "react";

const useCountdown = (isRunning: boolean, startingDuration?: number) => {
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!startingDuration) return;
    setRemainingDuration(startingDuration);

    if (isRunning && !interval.current) {
      interval.current = setInterval(() => setRemainingDuration((prev) => prev - 1000), 1000);
    } else if (!isRunning && interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [startingDuration, isRunning]);

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
