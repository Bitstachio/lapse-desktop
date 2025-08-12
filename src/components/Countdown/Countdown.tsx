import { useEffect, useRef, useState } from "react";

interface ICountdownProps {
  initialDuration: number | undefined;
  isRunning: boolean;
}

const Countdown = ({ initialDuration, isRunning }: ICountdownProps) => {
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const interval = useRef<NodeJS.Timeout | null>(null); // TODO: Determine appropriate type

  useEffect(() => {
    if (initialDuration) {
      setRemainingDuration(initialDuration);

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

    if (initialDuration) setRemainingDuration(initialDuration);
  }, [initialDuration, isRunning]);

  useEffect(() => {
    const minutes = Math.floor(remainingDuration / 60_000);
    const seconds = Math.floor((remainingDuration % 60_000) / 1000);
    const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setFormattedTime(formatted);
  }, [remainingDuration]);

  return (
    <p aria-live="polite" role="status">
      {formattedTime}
    </p>
  );
};

export default Countdown;
