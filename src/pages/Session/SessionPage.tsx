import { useEffect, useState } from "react";
import Countdown from "../../components/Countdown/Countdown.tsx";
import CountdownController from "../../components/CountdownController/CountdownController.tsx";
import TimeoutModal from "../../components/TimeoutModal/TimeoutModal.tsx";
import useProcessManager from "../../hooks/useProcessManager.ts";

const DashboardPage = () => {
  const [remainingDuration, setRemainingDuration] = useState<number | undefined>();

  const { state, status, start, pause, resume, extend, finish } = useProcessManager("BX50", 4);

  useEffect(() => {
    if (status.isSuccess && !status.isFetching && status.data) {
      setRemainingDuration(status.data.interval.remainingDuration);
    }
  }, [status]);

  return (
    <main>
      {state === "timeout" && <TimeoutModal onExtend={extend} onFinish={finish} />}
      <Countdown processState={state} startingDuration={remainingDuration} />
      <CountdownController state={state} onStart={start} onPause={pause} onResume={resume} />
    </main>
  );
};

export default DashboardPage;
