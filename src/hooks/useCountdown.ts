import { useEffect, useRef, useState } from "react";

const useCountdown = (isRunning: boolean, startingDuration?: number) => {
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (startingDuration) {
      setRemainingDuration(startingDuration);

      if (isRunning) {
        if (!interval.current) {
          interval.current = setInterval(() => {
            setRemainingDuration((prev) => {
              return prev - 1000;
            });
          }, 1000);
        }
      } else {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }
    }

    if (startingDuration) setRemainingDuration(startingDuration);
  }, [startingDuration, isRunning]);

  useEffect(() => {
    const minutes = Math.floor(remainingDuration / 60_000);
    const seconds = Math.floor((remainingDuration % 60_000) / 1000);
    const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setFormattedTime(formatted);
  }, [remainingDuration]);

  return {
    formattedTime,
  };
};

export default useCountdown;
