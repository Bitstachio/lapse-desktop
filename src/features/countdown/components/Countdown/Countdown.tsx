import useCountdown from "../../hooks/useCountdown";
import { TProcessState } from "../../../process/types";

interface ICountdownProps {
  processState: TProcessState;
  startingDuration?: number;
}

const Countdown = ({ processState, startingDuration }: ICountdownProps) => {
  const { formattedTime } = useCountdown(processState, startingDuration);

  return (
    <p aria-live="polite" role="status">
      {formattedTime}
    </p>
  );
};

export default Countdown;
