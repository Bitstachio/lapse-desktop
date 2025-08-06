import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePauseProcessMutation, useResumeProcessMutation, useStartProcessMutation } from "../../api/mutations.ts";
import { useProcessStatus } from "../../api/queries.ts";
import socket from "../../api/socket.ts";
import TimeoutModal from "../../components/TimeoutModal/TimeoutModal.tsx";

const DashboardPage = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [remainingDuration, setRemainingDuration] = useState<number | undefined>();
  const [isTimeout, setIsTimeout] = useState(false);

  const queryClient = useQueryClient();
  const processStatus = useProcessStatus();
  const startProcess = useStartProcessMutation(queryClient);
  const pauseProcess = usePauseProcessMutation(queryClient);
  const resumeProcess = useResumeProcessMutation(queryClient);

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("process-timeout", (data) => {
      setMessage(data.type);
      if (data.type === "PROCESS_TIMEOUT") {
        setIsTimeout(true);
      } else { // data.type === "EXTENSION_TIMEOUT"

      } // TODO: Add error handling for invalid state
    });

    return () => {
      socket.off("process-timeout");
    };
  }, []);

  useEffect(() => {
    if (processStatus.isSuccess && !processStatus.isFetching) {
      if (processStatus.data) {
        setRemainingDuration(processStatus.data.interval.remainingDuration);
      } else {
        // startProcess.mutate({ component: "BX50", quantity: 4 });
      }
    }
  }, [processStatus, startProcess]);

  const handlePause = () => {
    pauseProcess.mutate();
    setIsRunning(false);
  };

  const handleResume = () => {
    resumeProcess.mutate();
    setIsRunning(true);
  };

  return (
    <main>
      <p>Message: {message}</p>
      {isTimeout && <TimeoutModal />}
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
