import useCountdown from "../../hooks/useCountdown";
import { TProcessStatus } from "../../types";

interface ICountdownProps {
  processStatus: TProcessStatus;
}

const Countdown = ({ processStatus }: ICountdownProps) => {
  const { formattedTime } = useCountdown(processStatus);

  return (
    <p aria-live="polite" role="status" className={`${processStatus.data?.state === "timeout" && "text-danger"}`}>
      {formattedTime}
    </p>
  );
};

export default Countdown;
