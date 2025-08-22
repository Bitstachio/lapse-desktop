import { TProcessState } from "../../../process/types";
import useCountdown from "../../hooks/useCountdown";
import { TProcessStatus } from "../../types";

interface ICountdownProps {
  processState: TProcessState;
  processStatus: TProcessStatus;
}

const Countdown = ({ processState, processStatus }: ICountdownProps) => {
  const { formattedTime } = useCountdown(processState, processStatus);

  return (
    <p aria-live="polite" role="status">
      {formattedTime}
    </p>
  );
};

export default Countdown;
