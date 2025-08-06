import { useEffect, useState } from "react";
import { useProcessStatus } from "../../api/queries.ts";
import { usePauseProcessMutation, useResumeProcessMutation, useStartProcessMutation } from "../../api/mutations.ts";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../../api/socket.ts";

const DashboardPage = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [remainingDuration, setRemainingDuration] = useState<number | undefined>();

  const queryClient = useQueryClient();
  const processStatus = useProcessStatus();
  const startProcess = useStartProcessMutation(queryClient);
  const pauseProcess = usePauseProcessMutation(queryClient);
  const resumeProcess = useResumeProcessMutation(queryClient);

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("news", (data) => {
      console.log("News from server:", data);
      setMessage(data.msg);
    });

    socket.on("process-timeout", (data) => {
      console.log("Broadcast from other client:", data);
    });

    return () => {
      socket.off("news");
      socket.off("broadcast-message");
    };
  }, [])

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
