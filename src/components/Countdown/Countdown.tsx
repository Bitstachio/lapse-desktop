import { useEffect, useState } from "react";

interface ICountdownProps {
  initialDuration: number | undefined;
}

const Countdown = ({ initialDuration }: ICountdownProps) => {
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    if (initialDuration) setRemainingDuration(initialDuration);
  }, [initialDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingDuration((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
