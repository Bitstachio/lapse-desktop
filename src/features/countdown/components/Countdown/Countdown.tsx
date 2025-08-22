import useCountdown from "../../hooks/useCountdown";
import { TProcessStatus } from "../../types";

interface ICountdownProps {
  processStatus: TProcessStatus;
}

const Countdown = ({ processStatus }: ICountdownProps) => {
  const { formattedTime } = useCountdown(processStatus);

  return (
    <p aria-live="polite" role="status">
      {formattedTime}
    </p>
  );
};

export default Countdown;
