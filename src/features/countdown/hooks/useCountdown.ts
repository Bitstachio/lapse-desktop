import { useEffect, useRef, useState } from "react";
import { TProcessState } from "../../process/types";
import { TProcessStatus } from "../types";
import { formatProcessDuration } from "../utils";

const useCountdown = (processState: TProcessState, processStatus: TProcessStatus) => {
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

      if (processState === "inactive") reset();

      if (processState === "running" && !interval.current) {
        interval.current = setInterval(() => setRemainingDuration((prev) => prev - 1000), 1000);
      } else if (processState === "paused" && interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  }, [processStatus]);

  useEffect(() => {
    const startingDuration = processStatus.data?.interval.remainingDuration;
    setFormattedTime(formatProcessDuration(processState, startingDuration ?? 0, remainingDuration));
  }, [remainingDuration]);

  return {
    formattedTime,
  };
};

export default useCountdown;
