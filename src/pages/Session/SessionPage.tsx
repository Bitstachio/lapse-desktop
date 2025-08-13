import { useEffect, useState } from "react";
import socket from "../../api/socket.ts";
import Countdown from "../../components/Countdown/Countdown.tsx";
import CountdownController from "../../components/CountdownController/CountdownController.tsx";
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
      }
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
      {isTimeout && <TimeoutModal onExtend={processManager.extend} onFinish={processManager.finish} />}
      <Countdown processState={processManager.state} startingDuration={remainingDuration} />
      <CountdownController
        state={processManager.state}
        onStart={processManager.start}
        onPause={processManager.pause}
        onResume={processManager.resume}
      />
    </main>
  );
};

export default DashboardPage;
