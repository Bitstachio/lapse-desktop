import { useEffect, useRef, useState } from "react";
import { TProcessStatus } from "../types";
import { formatProcessDuration } from "../utils";

const useCountdown = (processStatus: TProcessStatus) => {
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

  // TODO: Polish
  useEffect(() => {
    if (processStatus.isSuccess && !processStatus.isFetching && processStatus.data) {
      setRemainingDuration(processStatus.data.interval.remainingDuration);

      // TODO: Consider switch case over state
      const state = processStatus.data.state;

      if (state === "inactive") reset();

      if (state === "running" && !interval.current) {
        interval.current = setInterval(() => setRemainingDuration((prev) => prev - 1000), 1000);
      } else if (state === "paused" && interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  }, [processStatus]);

  useEffect(() => {
    if (processStatus.isSuccess && !processStatus.isFetching && processStatus.data) {
      setFormattedTime(
        formatProcessDuration(
          processStatus.data.state,
          processStatus.data.interval.remainingDuration,
          remainingDuration,
        ),
      );
    } else {
      setFormattedTime(formatProcessDuration());
    }
  }, [remainingDuration]);

  return {
    formattedTime,
  };
};

export default useCountdown;
