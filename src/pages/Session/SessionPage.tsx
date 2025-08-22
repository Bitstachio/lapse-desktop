import Countdown from "../../features/countdown/components/Countdown/Countdown.tsx";
import CountdownController from "../../features/countdown/components/CountdownController/CountdownController.tsx";
import TimeoutModal from "../../features/countdown/components/TimeoutModal/TimeoutModal.tsx";
import useProcessManager from "../../features/process/hooks/useProcessManager.ts";

const SessionPage = () => {
  const { status, start, pause, resume, extend, finish } = useProcessManager("BX50", 4);

  return (
    <main>
      <Countdown processStatus={status} />
      {status.data && status.data.state === "timeout" ? (
        <TimeoutModal onExtend={extend} onFinish={finish} />
      ) : (
        <CountdownController state={status.data?.state ?? "inactive"} onStart={start} onPause={pause} onResume={resume} />
      )}
    </main>
  );
};

export default SessionPage;
