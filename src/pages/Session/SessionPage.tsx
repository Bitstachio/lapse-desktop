import { useEffect, useState } from "react";
import socket from "../../api/socket.ts";
import Countdown from "../../components/Countdown/Countdown.tsx";
import TimeoutModal from "../../components/TimeoutModal/TimeoutModal.tsx";
import useProcessManager from "../../hooks/useProcessManager.ts";

const DashboardPage = () => {
  const [remainingDuration, setRemainingDuration] = useState<number | undefined>();
  const [isTimeout, setIsTimeout] = useState(false);

  const [message, setMessage] = useState("");

  const processManager = useProcessManager("BX50", 4);

  useEffect(() => {
    socket.on("process-timeout", (data) => {
      setMessage(data.type);
      if (data.type === "PROCESS_TIMEOUT") {
        setIsTimeout(true);
      } else {
        // data.type === "EXTENSION_TIMEOUT"
      } // TODO: Add error handling for invalid state
    });

    return () => {
      socket.off("process-timeout");
    };
  }, []);

  useEffect(() => {
    if (processManager.status.isSuccess && !processManager.status.isFetching && processManager.status.data) {
      setRemainingDuration(processManager.status.data.interval.remainingDuration);
    }
  }, [processManager.status]);

  return (
    <main>
      <p>Message: {message}</p>
      {isTimeout && <TimeoutModal onExtendProcess={processManager.extend} onFinishProcess={processManager.finish} />}
      <Countdown initialDuration={remainingDuration} />
      <button onClick={processManager.start}>Start</button>
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
          {processManager.isRunning ? (
            <button type="button" onClick={processManager.pause} disabled={isTimeout}>
              Pause
            </button>
          ) : (
            <button type="button" onClick={processManager.resume} disabled={isTimeout}>
              Resume
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
