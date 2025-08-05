import { useEffect, useState } from "react";
import { useProcessStatus } from "../../api/queries.ts";
import { useStartProcessMutation } from "../../api/mutations.ts";
import { useQueryClient } from "@tanstack/react-query";

const DashboardPage = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [remainingDuration, setRemainingDuration] = useState<number | undefined>();

  const queryClient = useQueryClient();
  const processStatus = useProcessStatus();
  const startProcess = useStartProcessMutation(queryClient);

  useEffect(() => {
    if (processStatus.isSuccess) {
      if (processStatus.data) {
        setRemainingDuration(processStatus.data.interval.remainingDuration);
      } else {
        startProcess.mutate({ component: "BX50", quantity: 4 });
      }
    }
  }, [processStatus, startProcess]);

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  return (
    <main>
      <section aria-labelledby="process-info-heading">
        <h2 id="process-info-heading">Process Information</h2>
        <dl>
          <div>
            <dt>Status</dt>
            <dd>{remainingDuration ?? "Inactive"}</dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="timer-heading">
        <h2 id="timer-heading">Timer</h2>
        <p aria-live="polite" role="status">
          00:05:42
        </p>
        <div role="group" aria-label="Timer controls">
          {isRunning ? (
            <button type="button" onClick={handlePause}>
              Pause
            </button>
          ) : (
            <button type="button" onClick={handleResume}>
              Resume
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
