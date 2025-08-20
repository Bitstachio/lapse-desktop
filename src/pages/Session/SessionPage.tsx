import { useEffect, useState } from "react";
import Countdown from "../../features/countdown/components/Countdown/Countdown.tsx";
import CountdownController from "../../features/countdown/components/CountdownController/CountdownController.tsx";
import TimeoutModal from "../../features/countdown/components/TimeoutModal/TimeoutModal.tsx";
import useProcessManager from "../../features/process/hooks/useProcessManager.ts";

const SessionPage = () => {
  // const [remainingDuration, setRemainingDuration] = useState<number | undefined>();

  // const { state, status, start, pause, resume, extend, finish } = useProcessManager("BX50", 4);

  // useEffect(() => {
  //   if (status.isSuccess && !status.isFetching && status.data) {
  //     setRemainingDuration(status.data.interval.remainingDuration);
  //   }
  // }, [status]);

  return (
    <main>
      <h1>Hello</h1>
      {/* <Countdown processState={state} startingDuration={remainingDuration} />
      {state === "timeout" ? (
        <TimeoutModal onExtend={extend} onFinish={finish} />
      ) : (
        <CountdownController state={state} onStart={start} onPause={pause} onResume={resume} />
      )} */}
    </main>
  );
};

export default SessionPage;
