import Countdown from "../../features/countdown/components/Countdown/Countdown.tsx";
import CountdownController from "../../features/countdown/components/CountdownController/CountdownController.tsx";
import TimeoutModal from "../../features/countdown/components/TimeoutModal/TimeoutModal.tsx";
import useProcessManager from "../../features/process/hooks/useProcessManager.ts";

const SessionPage = () => {
  const { state, status, start, pause, resume, extend, finish } = useProcessManager("BX50", 4);

  return (
    <main>
      <Countdown processState={state} processStatus={status} />
      {state === "timeout" ? (
        <TimeoutModal onExtend={extend} onFinish={finish} />
      ) : (
        <CountdownController state={state} onStart={start} onPause={pause} onResume={resume} />
      )}
    </main>
  );
};

export default SessionPage;
